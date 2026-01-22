# Deploy na Vercel

## 1. Instalar Vercel CLI (se ainda não tiver)

```bash
npm install -g vercel
```

## 2. Fazer login na Vercel

```bash
vercel login
```

## 3. Deploy do projeto

```bash
vercel --prod
```

## Configuração

- O projeto está configurado para deploy automático via `vercel.json`
- O build é feito automaticamente através do comando `vite build`
- A API de posts funciona via Serverless Functions

## Banco de Dados

- Não precisa configurar nada externo
- Os posts são salvos em `data/posts.json` automaticamente
- Sistema file-based que funciona out-of-the-box na Vercel

## Admin

- Acesse: `https://seu-site.vercel.app/admin.html`
- Usuário: `paulo`
- Senha: `admin2026`

## Notas Importantes

- Os posts ficam salvos no servidor (não mais no localStorage)
- Todos os visitantes vão ver os mesmos posts
- O admin funciona 100% em produção
