# Otimização de Imagens - Guia

## Problema Identificado
As imagens estão muito grandes e precisam ser otimizadas:
- `Leo-ver.png`: 4.036 KiB → pode economizar 3.652 KiB
- `background-mobile.png`: 1.390 KiB → pode economizar 1.179 KiB

## Solução Recomendada

### Opção 1: Converter para WebP (Recomendado)
1. Use uma ferramenta online como:
   - https://squoosh.app/
   - https://convertio.co/png-webp/
   - https://cloudconvert.com/png-to-webp

2. Para cada imagem:
   - `Leo-ver.png` → `Leo-ver.webp`
   - `background-mobile.png` → `background-mobile.webp`
   - `back-leo-desk.png` → `back-leo-desk.webp`

3. Qualidade recomendada: 80-85% (boa qualidade, tamanho reduzido)

### Opção 2: Usar AVIF (Melhor compressão)
- AVIF oferece melhor compressão que WebP
- Suporte: Chrome, Firefox, Edge (não Safari antigo)
- Use fallback para PNG

### Opção 3: Comprimir PNGs existentes
- Use https://tinypng.com/
- Ou https://compressor.io/
- Pode reduzir 60-80% do tamanho mantendo PNG

## Implementação no Código

Após converter as imagens, atualize os imports:

```javascript
// HeaderSection.js
import backLeoDesk from '../../imgs/back-leo-desk.webp';
import backgroundMobile from '../../imgs/background-mobile.webp';

// AboutSection.js - se converter para img tag
import leoVer from '../../imgs/Leo-ver.webp';
```

## Resultado Esperado
- Economia total: ~4.831 KiB
- Melhor LCP (Largest Contentful Paint)
- Carregamento mais rápido
- Melhor experiência do usuário


