# LibSearch - Protótipo de Sistema de Biblioteca

Este repositório contém o código-fonte do frontend para o **LibSearch**, um protótipo de sistema de gerenciamento de biblioteca. A aplicação foi desenvolvida utilizando React com Vite e estilizada com Tailwind CSS, focando em uma interface moderna, responsiva e reativa.

## ✨ Funcionalidades Implementadas

O projeto simula as principais interações de um sistema de biblioteca, tanto da perspectiva do bibliotecário quanto do leitor.

### Visão do Bibliotecário

- **Tabelas de Gerenciamento**:
  - `Tabela de Leitores`: Lista todos os leitores com busca por nome.
  - `Tabela de Livros`: Lista todos os livros cadastrados com busca por título e autor.
- **Visualizações Detalhadas**:
  - `Perfil do Leitor`: Página detalhada com informações de contato, endereço, status, débitos e histórico de atividades (empréstimos e reservas) do leitor, simulando uma resposta de API completa.
  - `Tabela de Exemplares`: Visualização de todas as cópias (exemplares) de um livro específico, com status individual para cada uma.
- **Ações Interativas com Modais**:
  - Emprestar um exemplar disponível.
  - Editar um empréstimo existente (mudar data de devolução, adicionar reserva).
  - Adicionar um novo exemplar a um livro.
  - Visualizar a fila de reserva de um exemplar.
  - Excluir um exemplar.
  - Visualizar informações detalhadas de um livro (ISBN, editora, etc.).

### Visão do Leitor

- **Layout Dedicado**: Área do leitor com cabeçalho personalizado que exibe o débito total.
- **Páginas de Consulta**:
  - `Meus Empréstimos`: Histórico completo de todos os empréstimos (ativos, atrasados e devolvidos).
  - `Situação dos Empréstimos`: Página focada em exibir apenas os empréstimos com débitos (multas) pendentes.
- **Ações do Leitor**:
  - Modal de pagamento simulando um fluxo com "PIX Copia e Cola".

### Funcionalidades Gerais

- **Autenticação**: Telas de Login e Cadastro.
- **Navegação**: Sistema de rotas robusto utilizando `react-router-dom`, incluindo rotas aninhadas e uma página 404 personalizada.
- **Componentização**: Alta reutilização de componentes como `Header` (com variantes) e `Modal` para uma base de código limpa e de fácil manutenção.

## 🚀 Tecnologias Utilizadas

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Roteamento**: [React Router DOM](https://reactrouter.com/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Requisições HTTP**: [Axios](https://axios-http.com/)
- **Ícones**: [Heroicons](https://heroicons.com/)

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (recomenda-se a versão LTS)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

```bash
# 1. Clone este repositório
git clone [https://github.com/ArthurCatarino/LibOnline.git](https://github.com/ArthurCatarino/LibOnline.git)

# 2. Navegue até o diretório do projeto
cd seu-repositorio

# 3. Instale as dependências do projeto
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Após executar `npm run dev`, o Vite iniciará o servidor. Abra seu navegador e acesse `http://localhost:5173` (ou a porta que for indicada no seu terminal) para ver a aplicação funcionando.

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm run build`: Compila a aplicação para produção na pasta `dist`.
- `npm run preview`: Serve a versão de produção localmente para teste.
