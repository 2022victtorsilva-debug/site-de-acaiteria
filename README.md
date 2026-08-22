# Açaí Nativa

Site premium single-page para uma açaiteria contemporânea, criado como base reutilizável para projetos reais da Yuukri.

## Tecnologias
- React
- TypeScript
- Vite
- CSS responsivo
- Lucide React

## Rodar localmente
```bash
npm install
npm run dev
```

## Build de produção
```bash
npm run build
npm run lint
```

## Configuração principal
Toda a personalização comercial está centralizada em `src/config/acaiConfig.ts`.

Nesse arquivo você altera:
- nome e tagline;
- WhatsApp em `contact.whatsapp`;
- Instagram em `contact.instagram`;
- endereço, cidade, estado e Maps em `location`;
- link do cardápio externo em `links.menuUrl`;
- horários em `openingHours`;
- tamanhos e preços em `sizes`;
- bases, frutas, complementos e coberturas;
- produtos em destaque, especiais e combos.

WhatsApp, Instagram, endereço e Maps começam vazios propositalmente. Enquanto estiverem vazios, os botões continuam visíveis e exibem um aviso seguro em vez de abrir links falsos.

## Adaptar para um cliente real
1. Duplique o repositório.
2. Preencha `src/config/acaiConfig.ts`.
3. Ajuste as cores em `src/styles.css` pelas variáveis de `:root`, se necessário.
4. Atualize cardápio, preços, produtos e horários no arquivo de configuração.
5. Substitua os visuais estilizados por fotos reais do cliente, se desejar.
6. Rode `npm run build` e `npm run lint` antes do deploy.

## GitHub Pages
O `vite.config.ts` já possui `base: '/site-de-acaiteria/'`, adequado ao nome deste repositório.

## Estrutura
- `src/config/acaiConfig.ts`: conteúdo e dados editáveis.
- `src/main.tsx`: interface, seções e experiência de montagem.
- `src/styles.css`: identidade visual, intro, animações e responsividade.
- `index.html`: SEO, Open Graph, favicon e app shell.

## Pedidos
Não existe checkout, banco de dados, autenticação ou sistema real de pedidos. O “Monte seu açaí” gera uma mensagem contextual e abre o WhatsApp somente quando um número real estiver configurado.
