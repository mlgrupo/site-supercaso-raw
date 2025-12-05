import { useState, useEffect, useRef } from 'react';

/**
 * Hook para animar números de 0 até o valor final
 * @param {number|string} endValue - Valor final a ser alcançado
 * @param {number} duration - Duração da animação em milissegundos
 * @param {boolean} shouldAnimate - Se deve animar ou não
 * @returns {string} - Valor formatado durante a animação
 */
const useCountUp = (endValue, duration = 2000, shouldAnimate = true) => {
  const [count, setCount] = useState(0);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Função para extrair número de strings como "62 mil", "95 mil", etc.
  const extractNumber = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;
    
    // Remove espaços e converte para minúsculas
    const cleanValue = value.trim().toLowerCase();
    
    // Verifica se contém "mil"
    if (cleanValue.includes('mil')) {
      const numStr = cleanValue.replace('mil', '').trim();
      const num = parseFloat(numStr.replace(',', '.'));
      return isNaN(num) ? 0 : num * 1000;
    }
    
    // Tenta converter diretamente
    const num = parseFloat(cleanValue.replace(/[^\d.,]/g, '').replace(',', '.'));
    return isNaN(num) ? 0 : num;
  };

  // Função para formatar número de volta para o formato original
  const formatNumber = (num, originalValue) => {
    if (typeof originalValue === 'string' && originalValue.toLowerCase().includes('mil')) {
      const thousands = Math.floor(num / 1000);
      if (thousands >= 1) {
        return `${thousands} mil`;
      }
      return Math.floor(num).toString();
    }
    
    // Se o número original tinha vírgula ou formato especial, mantém
    if (typeof originalValue === 'string') {
      const hasComma = originalValue.includes(',');
      if (hasComma) {
        return Math.floor(num).toLocaleString('pt-BR');
      }
    }
    
    return Math.floor(num).toString();
  };

  useEffect(() => {
    if (!shouldAnimate || !endValue) {
      setCount(extractNumber(endValue));
      return;
    }

    const startValue = 0;
    const finalValue = extractNumber(endValue);
    
    if (finalValue === 0) {
      setCount(0);
      return;
    }

    startTimeRef.current = null;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (finalValue - startValue) * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(finalValue);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [endValue, duration, shouldAnimate]);

  return formatNumber(count, endValue);
};

export default useCountUp;

