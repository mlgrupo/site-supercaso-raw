import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from '../../context/FormContext';
import { Link } from 'react-router-dom';
import './FormularioHarmonizacao.css';

const FormularioHarmonizacao = () => {
  const { isFormOpen, closeForm } = useForm();

  // Estados do formulário
  const [currentError, setCurrentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    whatsapp: '',
    instagram: '',
    harmonizacao: '',
  });

  // Função para classificar baseado na harmonização
  const getClassificacao = (harmonizacao) => {
    if (harmonizacao === 'Não, mas quero começar') {
      return 'Não atua';
    }
    if (
      harmonizacao === 'Sim, faturo até 5mil mensal' ||
      harmonizacao === 'Sim, faturo de 5mil a 12mil mensal'
    ) {
      return 'Atua -12';
    }
    if (
      harmonizacao === 'Sim, faturo de 13mil a 30mil mensal' ||
      harmonizacao === 'Sim, faturo de 31mil a 70mil mensal' ||
      harmonizacao === 'Sim, faturo acima de 71mil mensal'
    ) {
      return 'Atua +12';
    }
    return 'Não atua';
  };

  // FUNÇÃO PARA TRACKING
  const executeTracking = useCallback(
    (processedPhone) => {
      try {
        if (typeof window !== 'undefined' && window.dataLayer) {
          const leadType = getClassificacao(formData.harmonizacao);
          const nomeCompleto = formData.nome.trim();
          const partesNome = nomeCompleto.split(' ');
          const firstName = partesNome[0];
          const lastName = partesNome.slice(1).join(' ') || '';

          window.dataLayer.push({
            event: 'form_submit_harmonizacao',
            form_type: 'harmonizacao_facial',
            conversion_value: 1,
            currency: 'BRL',
            form_data: {
              email: formData.email,
              first_name: firstName,
              last_name: lastName,
              full_name: nomeCompleto,
              instagram: formData.instagram.replace('@', ''),
              ja_atua: formData.harmonizacao,
              phone_number: processedPhone,
              lead_type: leadType,
            },
            timestamp: Date.now(),
          });
        }
        return true;
      } catch (error) {
        console.error('Erro no tracking:', error);
        return false;
      }
    },
    [formData.harmonizacao, formData.nome, formData.email, formData.instagram]
  );

  // CARREGAR DADOS DO LOCALSTORAGE AO INICIALIZAR
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('harmonizacao_form_data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const hasData = Object.values(parsedData).some(
          (value) => value && typeof value === 'string' && value.trim() !== ''
        );
        if (hasData) {
          setFormData((prevData) => ({
            ...prevData,
            ...parsedData,
          }));
        }
      }
    } catch (error) {
      console.log('Erro ao carregar dados salvos:', error);
      localStorage.removeItem('harmonizacao_form_data');
    }
  }, []);

  // SALVAR DADOS NO LOCALSTORAGE QUANDO FORMULÁRIO MUDAR
  useEffect(() => {
    const hasData = Object.values(formData).some(
      (value) => typeof value === 'string' && value.trim() !== ''
    );
    if (hasData) {
      try {
        localStorage.setItem('harmonizacao_form_data', JSON.stringify(formData));
      } catch (error) {
        console.log('Erro ao salvar dados:', error);
      }
    }
  }, [formData]);

  // Opções do dropdown de harmonização
  const harmonizacaoOptions = [
    'Não, mas quero começar',
    'Sim, faturo até 5mil mensal',
    'Sim, faturo de 5mil a 12mil mensal',
    'Sim, faturo de 13mil a 30mil mensal',
    'Sim, faturo de 31mil a 70mil mensal',
    'Sim, faturo acima de 71mil mensal',
  ];

  // Função para processar WhatsApp
  const processWhatsAppNumber = (rawPhone) => {
    const digitsOnly = rawPhone.trim().replace(/\D/g, '');
    if (digitsOnly.startsWith('55') && digitsOnly.length > 11) {
      const semDDI = digitsOnly.slice(2);
      if (semDDI.length === 11) {
        return digitsOnly;
      }
      if (semDDI.length === 10) {
        return '55' + semDDI.slice(0, 2) + '9' + semDDI.slice(2);
      }
    }
    if (digitsOnly.length === 11) {
      return '55' + digitsOnly;
    }
    if (digitsOnly.length === 10) {
      return '55' + digitsOnly.slice(0, 2) + '9' + digitsOnly.slice(2);
    }
    return null;
  };

  // VALIDAÇÃO SEQUENCIAL
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      setCurrentError('Por favor, preencha seu e-mail');
      return false;
    } else if (!emailRegex.test(formData.email)) {
      setCurrentError('Digite um e-mail válido');
      return false;
    } else if (formData.email.includes('..')) {
      setCurrentError('E-mail não pode ter pontos duplos');
      return false;
    } else if (formData.email.startsWith('.') || formData.email.startsWith('@')) {
      setCurrentError('E-mail não pode começar com . ou @');
      return false;
    }

    const nomeCompleto = formData.nome.trim();
    if (!nomeCompleto) {
      setCurrentError('Por favor, preencha seu nome');
      return false;
    } else if (nomeCompleto.length < 3) {
      setCurrentError('Nome muito curto');
      return false;
    } else if (!nomeCompleto.includes(' ')) {
      setCurrentError('Digite seu nome completo');
      return false;
    }

    const whatsappClean = formData.whatsapp.replace(/\D/g, '');
    let cleanNumber = whatsappClean;
    if (whatsappClean.startsWith('55') && whatsappClean.length > 11) {
      cleanNumber = whatsappClean.slice(2);
    }
    if (!formData.whatsapp) {
      setCurrentError('Por favor, preencha seu WhatsApp');
      return false;
    } else if (cleanNumber.length !== 10 && cleanNumber.length !== 11) {
      setCurrentError('WhatsApp deve ter 10 ou 11 dígitos');
      return false;
    } else {
      const ddd = cleanNumber.substring(0, 2);
      const dddNum = parseInt(ddd);
      const validDDDs = [
        11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32,
        33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53,
        54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77,
        79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96,
        97, 98, 99,
      ];
      if (!validDDDs.includes(dddNum)) {
        setCurrentError('DDD inválido');
        return false;
      }
      if (cleanNumber.length === 11) {
        const ninthDigit = cleanNumber[2];
        if (ninthDigit !== '9') {
          setCurrentError('Celular deve ter o 9º dígito');
          return false;
        }
      } else if (cleanNumber.length === 10) {
        const firstDigit = cleanNumber[2];
        if (!['6', '7', '8', '9'].includes(firstDigit)) {
          setCurrentError('Número de celular inválido');
          return false;
        }
      }
    }

    const instagramClean = formData.instagram.replace('@', '').trim();
    if (!formData.instagram) {
      setCurrentError('Por favor, preencha seu Instagram');
      return false;
    } else if (instagramClean.length < 3) {
      setCurrentError('Username do Instagram muito curto');
      return false;
    } else if (instagramClean.length > 30) {
      setCurrentError('Username do Instagram muito longo');
      return false;
    } else if (!/^[a-zA-Z0-9._]+$/.test(instagramClean)) {
      setCurrentError('Instagram pode ter apenas letras, números, . e _');
      return false;
    }

    if (!formData.harmonizacao) {
      setCurrentError('Por favor, selecione sua área de atuação');
      return false;
    }

    setCurrentError('');
    return true;
  };

  // Handlers de input
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (currentError) {
      setCurrentError('');
    }
  }, [currentError]);

  const handleWhatsAppChange = useCallback((e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('55') && value.length > 12) {
      value = value.slice(2);
    }
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length <= 10) {
        if (value.length === 10) {
          value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
        } else {
          value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
      } else if (value.length === 11) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      }
    }
    setFormData((prev) => ({
      ...prev,
      whatsapp: value,
    }));
    if (currentError) {
      setCurrentError('');
    }
  }, [currentError]);

  const handleInstagramChange = useCallback((e) => {
    let value = e.target.value;
    if (value && !value.startsWith('@')) {
      value = '@' + value.replace('@', '');
    }
    setFormData((prev) => ({
      ...prev,
      instagram: value,
    }));
    if (currentError) {
      setCurrentError('');
    }
  }, [currentError]);

  // FUNÇÃO PARA CAPTURAR PARÂMETROS DA URL
  const getCurrentUrlParams = () => {
    const params = {};
    try {
      const search = window.location.search;
      if (search && search.length > 1) {
        const pairs = search.substring(1).split('&');
        for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i];
          const equalIndex = pair.indexOf('=');
          if (equalIndex > 0) {
            const key = pair.substring(0, equalIndex);
            const value = pair.substring(equalIndex + 1);
            if (key && value) {
              try {
                params[decodeURIComponent(key)] = decodeURIComponent(value);
              } catch (e) {
                params[key] = value;
              }
            }
          }
        }
      }
    } catch (e) {
      console.log('Erro ao capturar parâmetros:', e);
    }
    return params;
  };

  // Handler de submit
  const handleSubmit = async () => {
    console.log('User Agent:', navigator.userAgent);
    console.log('URL atual:', window.location.href);
    console.log('Search params:', window.location.search);

    if (isSubmitting) return;
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const processedPhone = processWhatsAppNumber(formData.whatsapp);
    if (!processedPhone) {
      setCurrentError('Erro ao processar número de telefone');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Executando tracking...');
      executeTracking(processedPhone);
      await new Promise((resolve) => setTimeout(resolve, 300));

      let videoData = {
        tempo_assistido_segundos: 0,
        porcentagem_maxima_assistida: 0,
        video_id: null,
        ultima_atualizacao: null,
      };

      try {
        const savedVideoData = localStorage.getItem('video_time_watch');
        if (savedVideoData) {
          const parsedVideoData = JSON.parse(savedVideoData);
          videoData = parsedVideoData;
          console.log('📊 Dados do vídeo recuperados:', videoData);
        } else {
          console.log('⚠️ Nenhum dado de vídeo encontrado');
        }
      } catch (error) {
        console.error('❌ Erro ao ler dados do vídeo:', error);
      }

      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const currentParams = getCurrentUrlParams();
      const utmParams = {};
      const otherParams = {};
      const tipo_agendamento = 'usuario';

      for (const key in currentParams) {
        if (currentParams.hasOwnProperty(key)) {
          const value = currentParams[key];
          if (value && value.trim() !== '') {
            if (
              key.startsWith('utm_') ||
              ['gclid', 'fbclid', 'gbraid', 'wbraid'].includes(key)
            ) {
              utmParams[key] = value;
            } else {
              otherParams[key] = value;
            }
          }
        }
      }

      const webhookPayload = {
        form_data: {
          email: formData.email,
          first_name: formData.nome,
          phone_number: processedPhone,
          instagram: formData.instagram.replace('@', ''),
          ja_atua: formData.harmonizacao,
          tipo_agendamento: tipo_agendamento,
        },
        video_data: {
          tempo_assistido_segundos: videoData.tempo_assistido_segundos,
          porcentagem_maxima_assistida: videoData.porcentagem_maxima_assistida,
          video_id: videoData.video_id,
          ultima_atualizacao: videoData.ultima_atualizacao,
        },
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        utm_parameters: utmParams,
        other_parameters: otherParams,
        page_info: {
          url: window.location.href,
          pathname: window.location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
        },
        lead_source: 'harmonizacao_form',
        form_version: '1.1',
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
          ? 'mobile'
          : 'desktop',
      };

      console.log('📤 Enviando payload com dados do vídeo:', webhookPayload);

      const response = await fetch('https://workflows.reconectaoficial.com/webhook/lead-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!response.ok) {
        throw new Error(`Webhook response: ${response.status}`);
      }

      console.log('✅ Dados enviados com sucesso!');

      const buildRedirectUrl = () => {
        const classificado = getClassificacao(formData.harmonizacao);
        const formParams = {
          email: formData.email,
          first_name: formData.nome,
          phone_number: processedPhone,
          instagram: formData.instagram.replace('@', ''),
          ja_atua: formData.harmonizacao,
          classificado: classificado,
          session_id: sessionId,
          tipo_agendamento: 'usuario',
        };
        const allParams = Object.assign({}, currentParams, formParams);
        const buildParams = (params) => {
          const pairs = [];
          for (const key in params) {
            if (
              params.hasOwnProperty(key) &&
              params[key] != null &&
              params[key] !== ''
            ) {
              const value = String(params[key]).trim();
              if (value) {
                const encodedKey = encodeURIComponent(key);
                const encodedValue = encodeURIComponent(value);
                pairs.push(encodedKey + '=' + encodedValue);
              }
            }
          }
          return pairs.join('&');
        };
        const queryString = buildParams(allParams);
        const baseUrl = window.location.protocol + '//' + window.location.host;
        const finalUrl = baseUrl + '/consulta' + (queryString ? '?' + queryString : '');
        console.log('URL construída (compatível):', finalUrl);
        console.log('Parâmetros incluídos:', allParams);
        return finalUrl;
      };

      const redirectUrl = buildRedirectUrl();
      const isInstagramApp = /Instagram/.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
      const isInAppBrowser = isInstagramApp || /FBAN|FBAV|FB_IAB/.test(navigator.userAgent);

      console.log('Ambiente detectado:', {
        isInstagramApp,
        isIOS,
        isInAppBrowser,
      });

      try {
        if (isInAppBrowser && isIOS) {
          console.log('Usando redirecionamento para Instagram iOS');
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 100);
        } else {
          console.log('Usando redirecionamento padrão');
          window.location.replace(redirectUrl);
        }
      } catch (error) {
        console.error('Erro no redirecionamento:', error);
        try {
          window.location.href = redirectUrl;
        } catch (finalError) {
          console.error('Falha total no redirecionamento:', finalError);
          setCurrentError('Redirecionamento falhou. Toque aqui: ' + redirectUrl);
        }
      }
    } catch (error) {
      console.error('Erro geral ao enviar formulário:', error);
      setCurrentError('Erro ao enviar dados. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        focusedField === 'harmonizacao' &&
        !e.target.closest('[data-dropdown-container]')
      ) {
        setFocusedField('');
      }
    };
    if (focusedField === 'harmonizacao') {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [focusedField]);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isFormOpen) {
        closeForm();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isFormOpen, closeForm]);

  // Bloquear scroll do body quando formulário estiver aberto
  useEffect(() => {
    if (isFormOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isFormOpen]);

  if (!isFormOpen) return null;

  return (
    <div className="form-overlay" onClick={closeForm}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <button className="form-close-btn" onClick={closeForm}>
          ×
        </button>

        <h2 className="form-title">VERIFICAR DISPONIBILIDADE:</h2>

        {currentError && (
          <div className="form-error-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4m0 4h.01M5 19h14a2 2 0 001.84-2.75L13.84 4a2 2 0 00-3.68 0l-7 12.25A2 2 0 005 19z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {currentError}
          </div>
        )}

        <div className="form-group">
          <div className="form-input-wrapper">
            <span className="form-input-icon">
              <MailIcon color={focusedField === 'email' ? '#6CEEF9' : '#8C8C8C'} />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Digite aqui seu e-mail"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={(e) => {
                setFocusedField('email');
                e.target.style.borderColor = '#D3111A';
                e.target.style.boxShadow = '0 0 0 3px rgba(211, 17, 26, 0.1)';
              }}
              onBlur={(e) => {
                setFocusedField('');
                e.target.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-input-wrapper">
            <span className="form-input-icon">
              <UserIcon color={focusedField === 'nome' ? '#6CEEF9' : '#8C8C8C'} />
            </span>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleInputChange}
              onFocus={(e) => {
                setFocusedField('nome');
                e.target.style.borderColor = '#D3111A';
                e.target.style.boxShadow = '0 0 0 3px rgba(211, 17, 26, 0.1)';
              }}
              onBlur={(e) => {
                setFocusedField('');
                e.target.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-input-wrapper">
            <span className="form-input-icon">
              <WhatsAppIcon color={focusedField === 'whatsapp' ? '#27D366' : '#8C8C8C'} />
            </span>
            <input
              type="tel"
              name="whatsapp"
              placeholder="Seu número do WhatsApp"
              value={formData.whatsapp}
              onChange={handleWhatsAppChange}
              maxLength="15"
              onFocus={(e) => {
                setFocusedField('whatsapp');
                e.target.style.borderColor = '#D3111A';
                e.target.style.boxShadow = '0 0 0 3px rgba(211, 17, 26, 0.1)';
              }}
              onBlur={(e) => {
                setFocusedField('');
                e.target.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-input-wrapper">
            <span className="form-input-icon">
              <InstagramIcon color={focusedField === 'instagram' ? '#C42B8A' : '#8C8C8C'} />
            </span>
            <input
              type="text"
              name="instagram"
              placeholder="Seu @ do Instagram"
              value={formData.instagram}
              onChange={handleInstagramChange}
              onFocus={(e) => {
                setFocusedField('instagram');
                e.target.style.borderColor = '#D3111A';
                e.target.style.boxShadow = '0 0 0 3px rgba(211, 17, 26, 0.1)';
              }}
              onBlur={(e) => {
                setFocusedField('');
                e.target.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              className="form-input"
            />
          </div>
        </div>

        <div
          className={`form-group ${focusedField === 'harmonizacao' ? 'dropdown-open' : ''}`}
        >
          <div className="form-input-wrapper">
            <span className="form-input-icon">
              <MoneyIcon color={focusedField === 'harmonizacao' ? '#6CEEF9' : '#8C8C8C'} />
            </span>
            <div
              className={`form-select-container ${focusedField === 'harmonizacao' ? 'focused' : ''}`}
              onClick={() => setFocusedField(focusedField === 'harmonizacao' ? '' : 'harmonizacao')}
              data-dropdown-container="true"
            >
              <div className={`form-select-label ${formData.harmonizacao ? 'selected' : ''}`}>
                {formData.harmonizacao || 'Você já atua na área de harmonização facial?'}
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`form-select-arrow ${focusedField === 'harmonizacao' ? 'rotated' : ''}`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#8C8C8C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {focusedField === 'harmonizacao' && (
            <div className="form-options-container" data-dropdown-container="true">
              {harmonizacaoOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      harmonizacao: option,
                    }));
                    setFocusedField('');
                    if (currentError) setCurrentError('');
                  }}
                  className={`form-option-button ${formData.harmonizacao === option ? 'selected' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="form-submit-btn"
          disabled={isSubmitting}
        >
          <span style={{ textDecoration: 'underline' }}>
            {isSubmitting ? 'Enviando...' : 'Verificar Disponibilidade'}
          </span>
        </button>

        <div className="form-terms">
          Ao clicar no botão, você concorda com nossos{' '}
          <Link to="/termos-de-uso" className="form-terms-link">
            Termos de Uso
          </Link>{' '}
          e{' '}
          <Link to="/politica-de-privacidade" className="form-terms-link">
            Política de Privacidade
          </Link>
          ,<br />
          incluindo o uso de cookies e o envio de comunicações.
        </div>
      </div>
    </div>
  );
};

// Componentes de ícones
const MailIcon = ({ color = '#8C8C8C' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 6L12 13L2 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = ({ color = '#8C8C8C' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsAppIcon = ({ color = '#8C8C8C' }) => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
    <path
      d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378l-1.994 5.944 6.15-1.966C9.732 30.8 12.756 31.588 16.004 31.588 24.826 31.588 32 24.41 32 15.588 32 7.176 24.826 0 16.004 0z"
      fill={color}
    />
    <path
      d="M25.314 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826s1.2-3.422 1.628-3.89c.428-.47.936-.586 1.252-.586.316 0 .632.006.908.016.292.012.684-.11 1.07.816.386.94 1.314 3.218 1.43 3.452.118.234.196.506.04.816-.156.31-.234.504-.468.776-.234.272-.492.608-.702.816-.234.234-.478.488-.206.956.272.468 1.21 1.994 2.596 3.228 1.786 1.588 3.292 2.08 3.76 2.316.468.234.74.194.01.194s1.198-.156 1.626-.156c.428 0 .856.04 1.206.078.564.06 1.168.236 1.168.916v.702c0 .388-.078.792-.234 1.09z"
      fill="white"
    />
  </svg>
);

const InstagramIcon = ({ color = '#8C8C8C' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7616 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M17.5 6.5H17.51"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoneyIcon = ({ color = '#8C8C8C' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.46 0-.83-.44-1.61-2.11-2.14-1.93-.6-3.27-1.51-3.27-3.31 0-1.52 1.02-2.89 2.89-3.28V4h2.67v2.15c1.63.45 2.38 1.69 2.43 3.12h-1.96c-.07-.64-.32-1.46-1.29-1.46-1.06 0-1.58.63-1.58 1.44 0 .82.51 1.43 2.04 1.96 1.53.54 3.38 1.22 3.38 3.56.01 1.78-1.05 3-3.08 3.32z"
      fill={color}
    />
  </svg>
);

export default FormularioHarmonizacao;

