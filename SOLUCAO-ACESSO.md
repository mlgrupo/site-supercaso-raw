# Como Acessar o Site

## Problema Identificado
O projeto foi configurado como **Cloudflare Worker** ao invés de **Cloudflare Pages**. Para apps React, precisamos usar **Pages**.

## Solução: Migrar para Cloudflare Pages

### Passo 1: Criar um Projeto Pages
1. Acesse: [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Clique em **Create application** → **Pages** → **Connect to Git** (ou **Upload assets**)
3. Se conectar Git:
   - Selecione seu repositório
   - Configure:
     - **Build command**: `npm run build`
     - **Build output directory**: `build`
     - **Root directory**: `/` (raiz)
     - **Node version**: `18` ou `20`
     - **Deploy command**: (deixe vazio)

### Passo 2: Configurar Domínio Customizado
1. No projeto Pages criado, vá em **Custom domains**
2. Adicione: `lp.areconecta.com.br`
3. Configure o DNS no Cloudflare:
   - Tipo: `CNAME`
   - Nome: `lp`
   - Conteúdo: `[seu-projeto].pages.dev`

### Passo 3: Acessar o Site

**URL Temporária (Pages):**
```
https://[seu-projeto].pages.dev
```

**URL com Domínio Customizado:**
```
https://lp.areconecta.com.br
```

## Alternativa: Usar Workers (não recomendado para React)

Se quiser continuar usando Workers, você precisa:
1. Criar um Worker que sirva os arquivos estáticos do build
2. Isso é mais complexo e não é o ideal para apps React

## Recomendação
**Use Cloudflare Pages** - é a solução correta para apps React estáticos.

