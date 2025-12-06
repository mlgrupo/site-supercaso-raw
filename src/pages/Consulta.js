import { useEffect, useState } from 'react';
import './Consulta.css';

const Consulta = () => {
  const [iframeUrl, setIframeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Definir title e meta description específicos desta página
    const originalTitle = document.title;
    const originalMetaDescription = document.querySelector('meta[name="description"]');
    const originalMetaContent = originalMetaDescription ? originalMetaDescription.getAttribute('content') : null;
    
    document.title = 'Consulta de avaliação - Verifique a disponibilidade';
    
    // Criar ou atualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Saiba o que está sendo feito e também ter 10-60 novos pacientes, visite para mais informações');

    // Garantir que a classe seja adicionada
    const addClass = () => {
      document.body.classList.add('consulta-active');
    };
    
    // Adicionar classe ao body para prevenir scroll
    addClass();

    // Função robusta para capturar todos os parâmetros da URL
    // Compatível com TODOS os dispositivos (iOS, Android, Desktop, etc.)
    const getUrlParams = () => {
      const params = {};
      
      try {
        // Método universal - funciona em todos os navegadores e dispositivos
        const search = window.location.search || window.location.href.split('?')[1] || '';
        
        if (search && search.length > 1) {
          // Remover o '?' se existir no início
          const queryString = search.charAt(0) === '?' ? search.substring(1) : search;
          
          // Separar por '&'
          const pairs = queryString.split('&');
          
          for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            
            // Encontrar o índice do '='
            const equalIndex = pair.indexOf('=');
            
            if (equalIndex > 0) {
              const key = pair.substring(0, equalIndex);
              let value = pair.substring(equalIndex + 1);
              
              // Decodificar o valor
              try {
                value = decodeURIComponent(value.replace(/\+/g, ' '));
              } catch (e) {
                // Se falhar, usar o valor como está
                value = value.replace(/\+/g, ' ');
              }
              
              // Decodificar a chave
              let decodedKey = key;
              try {
                decodedKey = decodeURIComponent(key);
              } catch (e) {
                // Se falhar, usar a chave como está
                decodedKey = key;
              }
              
              if (decodedKey && value) {
                params[decodedKey] = value;
              }
            }
          }
        }
      } catch (e) {
        console.error('Erro ao capturar parâmetros:', e);
      }
      
      return params;
    };

    // Função para construir a URL do Typeform com os parâmetros
    // Garante funcionamento mesmo sem parâmetros
    const buildTypeformUrl = (params) => {
      const baseUrl = 'https://reconectaoficial.typeform.com/to/xzxQazkB';
      
      // Se não houver parâmetros, retornar apenas a URL base
      if (!params || Object.keys(params).length === 0) {
        return baseUrl;
      }

      const paramPairs = [];
      
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const value = params[key];
          
          // Verificar se o valor é válido
          if (value != null && value !== '' && value !== undefined) {
            const stringValue = String(value).trim();
            
            if (stringValue) {
              try {
                // Codificar chave e valor de forma segura
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(stringValue);
                paramPairs.push(encodedKey + '=' + encodedValue);
              } catch (e) {
                // Fallback: usar valores sem encoding se houver erro
                console.warn('Erro ao codificar parâmetro:', key, e);
                paramPairs.push(key + '=' + stringValue);
              }
            }
          }
        }
      }
      
      // Construir URL final
      if (paramPairs.length > 0) {
        return baseUrl + '?' + paramPairs.join('&');
      }
      
      return baseUrl;
    };

    // Processar parâmetros de forma síncrona para garantir disponibilidade imediata
    try {
      const urlParams = getUrlParams();
      console.log('Parâmetros capturados da URL:', urlParams);
      
      const finalUrl = buildTypeformUrl(urlParams);
      console.log('URL final do Typeform:', finalUrl);
      
      // Definir URL imediatamente - garante que esteja disponível antes do render
      setIframeUrl(finalUrl);

      // Esconder loading após um pequeno delay
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      // Cleanup
      return () => {
        clearTimeout(loadingTimeout);
        document.body.classList.remove('consulta-active');
        // Restaurar title original
        document.title = originalTitle;
        // Restaurar meta description original
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          if (originalMetaContent) {
            metaDesc.setAttribute('content', originalMetaContent);
          } else {
            metaDesc.remove();
          }
        }
      };
    } catch (error) {
      console.error('Erro ao processar parâmetros:', error);
      
      // Mesmo com erro, carregar o Typeform sem parâmetros
      setIframeUrl('https://reconectaoficial.typeform.com/to/xzxQazkB');
      
      const errorTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => {
        clearTimeout(errorTimeout);
        document.body.classList.remove('consulta-active');
        // Restaurar title original
        document.title = originalTitle;
        // Restaurar meta description original
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          if (originalMetaContent) {
            metaDesc.setAttribute('content', originalMetaContent);
          } else {
            metaDesc.remove();
          }
        }
      };
    }
  }, []);

  // Garantir que o iframe seja renderizado mesmo se a URL ainda não estiver pronta
  const displayUrl = iframeUrl || 'https://reconectaoficial.typeform.com/to/xzxQazkB';

  return (
    <div className="consulta-page">
        {isLoading && (
          <div className="consulta-loading">
            <p>Carregando aplicação...</p>
          </div>
        )}
        <iframe
          key={displayUrl}
          src={displayUrl}
          className="consulta-iframe"
          title="Consulta"
          allow="camera; microphone; geolocation; autoplay; encrypted-media; picture-in-picture"
          frameBorder="0"
          loading="eager"
          allowFullScreen
        />
      </div>
  );
};

export default Consulta;
