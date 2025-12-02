# App com Bugs

## 🚨 Cenário

Acabaste de entrar numa startup e herdaste um dashboard "MVP" construído por um programador que, entretanto, saiu da empresa. Os stakeholders queixam-se do desempenho, problemas de layout em dispositivos móveis e preocupações de segurança.

A tua tarefa é **refatorizar, corrigir e otimizar** esta aplicação. O objetivo não é apenas pô-la a "funcionar", mas torná-la pronta para produção, com bom desempenho e de fácil manutenção.

---

## 🛠️ A Missão

Tens uma janela de tempo curta e fixa para analisar o projeto, encontrar problemas importantes e demonstrar como os priorizarias e corrigirias. Foca-te em identificar problemas de alto impacto em toda a stack e em aplicar melhorias práticas e bem fundamentadas.

Áreas de foco sugeridas (não exaustivas):

- Comportamento do backend e segurança dos dados
- Desempenho e responsividade do frontend
- Organização do código e facilidade de manutenção

Prepara-te para explicar as tuas conclusões, _trade-offs_ e próximos passos, em vez de seguires uma _checklist_ rígida.

---

## 🚀 Configuração e comandos

O ambiente já está configurado com Next.js, Tailwind e Bun.

1. **Criar / clonar o repositório:**

- **Obter o repositório via SSH (recomendado):**

  - No GitHub, vai à página do repositório e clica em "Code" → escolhe a opção "SSH" e copia a URL (começa por `git@github.com:`).
  - No teu terminal, clona o repositório com:

    ```bash
    git clone git@github.com:USERNAME/REPO.git
    ```

  - Se ainda não tens uma chave SSH configurada, gera uma e adiciona ao GitHub:

    ```bash
    # gerar chave (substitui email@example.com)
    ssh-keygen -t ed25519 -C "email@example.com"

    # mostra a chave pública para copiares
    cat ~/.ssh/id_ed25519.pub
    ```

  - Cola a chave pública nas `Settings` → `SSH and GPG keys` do GitHub.

- **Obter o repositório via HTTPS (alternativa):**

  - Usa a URL HTTPS e clona com:

    ```bash
    git clone https://github.com/USERNAME/REPO.git
    ```

2. **Instalar dependências** (se necessário):

   ```bash
   bun install
   ```

3. **Correr o servidor de desenvolvimento:**
   ```bash
   bun run dev
   ```

## Git: fluxo básico de trabalho

- **Criar uma nova branch para a tua alteração:**

  ```bash
  git checkout -b feat/minha-melhoria
  ```

- **Fazer alterações, verificar e preparar o commit:**

  ```bash
  git add .
  git status
  git commit -m "Breve mensagem: o que foi alterado e porquê"
  ```

- **Enviar as alterações para o remoto:**

  ```bash
  git push -u origin feat/minha-melhoria
  ```

- **Boa prática de mensagens de commit:** refere o objetivo e a razão da alteração (não precisa de ser muito detalhado). Ex: `corrige layout mobile do header`.

- **Alternativa gráfica (GitHub Desktop):**

  - Se tiveres dificuldades a usar a linha de comando para commitar/push (por ex. problemas com credenciais SSH/HTTPS), podes usar o **GitHub Desktop** que fornece uma interface gráfica simples para clonar, criar branches, fazer commits e enviar para o remoto.
  - Download: https://desktop.github.com/
  - O fluxo na aplicação é: `File -> Clone repository` ou `Repository -> Open in GitHub Desktop` (se partires do GitHub web), depois fazes `Branch -> New branch`, adicionas as modificações, escreves a mensagem de commit e clicas em `Push origin`.

## .env: usar o `.env.example`

- Faz uma cópia do ficheiro de exemplo para criar o teu ficheiro de ambiente local:

  ```bash
  cp .env.example .env
  ```

- Edita o ` .env` com os valores locais (API keys, URLs, flags). Nunca comites o ficheiro `.env` para o repositório público.

- Se precisares de partilhar valores não-sensíveis (ex.: variáveis com valores fictícios), atualiza apenas o `.env.example` e explica as diferenças no teu `README` ou na descrição do PR.

## Atualizar o `README` com as tuas alterações

- Quando fizeres alterações, por favor atualiza este `README.md` (ou cria um ficheiro `CHANGES.md`) com uma pequena nota sobre o que mudaste e porquê. Não é necessário descrever cada detalhe — apenas a lógica por trás das mudanças, por exemplo:

  - **O que:** corrigi o comportamento da pesquisa para fazer debounce.
  - **Porquê:** reduz chamadas desnecessárias à API e melhora performance.

- Isto ajuda os revisores a perceber o raciocínio rapidamente e mantém o histórico do projeto claro.

## ✅ Definição de Concluído

1. A app é totalmente responsiva em telemóvel e desktop.
2. A escrita na barra de pesquisa aguarda que o utilizador pare de escrever antes de fazer o _fetch_ (Debounce).
3. O Gráfico não pisca (_flicker_) desnecessariamente.
4. Dados sensíveis não são visíveis no separador "Network" (Rede) do browser.
5. A base de código está limpa, tipada e separada em componentes.

## Dependências principais (runtime):

- `@libsql/client` ^0.15.15
- `@t3-oss/env-nextjs` ^0.13.8
- `drizzle-orm` ^0.44.7
- `next` ^16.0.3
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `recharts` ^3.4.1
- `zod` ^4.1.12

## Dependências de desenvolvimento:

- `@biomejs/biome` ^2.3.7
- `@tailwindcss/postcss` ^4.1.17
- `@types/node` ^24.10.1
- `@types/react` ^19.2.6
- `@types/react-dom` ^19.2.3
- `drizzle-kit` ^0.31.7
- `postcss` ^8.5.6
- `tailwindcss` ^4.1.17
- `typescript` ^5.9.3

Nota: podes adaptar a implementação para bibliotecas similares com as quais estejas mais familiarizado, desde que não alteres significativamente a estrutura do projeto. Se optares por trocar uma biblioteca importante (ex.: mudar `recharts` por outra lib de gráficos), explica essa escolha no teu `README` ou nas notas do PR.

## 📁 Visão Geral da Pasta `src`

```
src
├── app
│   ├── api
│   │   └── products
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── env.js
├── server
│   ├── db
│   │   ├── index.ts
│   │   └── schema.ts
│   └── legacy_data.json
└── styles
      └── globals.css
```

- `app/` : Pasta da aplicação Next.js contendo rotas de UI e _endpoints_ da API.
  - `app/api/products/route.ts` : Rota de servidor que serve dados de produtos ao frontend (a lógica da API, filtragem e higienização acontecem aqui).
  - `app/layout.tsx` : Layout partilhado da app (cabeçalho, rodapé e _providers_ globais).
  - `app/page.tsx` : Página principal do dashboard (renderiza a pesquisa, o gráfico e a tabela de produtos).
- `env.js` : Valores relacionados com o ambiente carregados em tempo de execução (ex: _feature flags_ ou auxiliares de ambiente do lado do cliente).
- `server/` : Utilitários leves do lado do servidor e dados usados pela app.
  - `server/db/index.ts` : Configuração do cliente de base de dados e auxiliares (conectores, _helpers_ de consulta).
  - `server/db/schema.ts` : Esquema da BD e definições de tipos (modelos usados pela app).
  - `server/legacy_data.json` : Dados de exemplo/_seed_ usados durante o desenvolvimento ou testes.
- `styles/` : Estilos globais do projeto.
  - `styles/globals.css` : Importações base do Tailwind e regras CSS globais.

Estes ficheiros são os primeiros locais a inspecionar ao avaliar o comportamento do backend, a renderização do frontend e a arquitetura geral.

**Poderás recorrer à inteligência artificial como apoio, desde que sejas capaz de identificar claramente as alterações que realizaste e o motivo dessas escolhas. Caso contrário, não conseguiremos compreender o teu processo de raciocínio. Não é determinante que a solução seja perfeita ou a mais sofisticada; o que realmente importa é demonstrares que identificaste os problemas, que exploraste possíveis soluções e que justificaste a opção que escolheste como sendo, no teu entendimento, a mais viável.**

**Boa sorte. Esperamos ver-te em breve.**

## Bibliotecas instaladas
