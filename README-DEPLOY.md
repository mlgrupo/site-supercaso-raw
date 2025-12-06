# Deploy no Cloudflare Pages

## Opção 1: Via Interface Web (Recomendado)

1. Acesse o [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. Clique em "Create a project"
3. Conecte seu repositório Git OU faça upload direto
4. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
   - **Root directory**: `/` (raiz do projeto)
   - **Node version**: `18` ou `20`

## Opção 2: Via CLI

```bash
# 1. Instalar wrangler (se ainda não tiver)
npm install -g wrangler

# 2. Fazer login
wrangler login

# 3. Fazer build
npm run build

# 4. Deploy
wrangler pages deploy build --project-name=reconecta-landing-page
```

Ou use o script:
```bash
npm run deploy:cloudflare
```

## Importante

- **NÃO use** `wrangler deploy` (isso é para Workers)
- **USE** `wrangler pages deploy` (para Pages)
- O diretório de build é `build` (não `dist`)

