## **Descrição do Problema**

A Biblioteca da UFLA, uma instituição dedicada à disseminação do conhecimento e da cultura, atualmente opera com processos predominantemente manuais.
A gestão do acervo (livros e exemplares), o cadastro e acompanhamento dos leitores, e o controle de empréstimos e devoluções são tarefas que demandam tempo excessivo da equipe, são suscetíveis a erros e dificultam a identificação de itens atrasados ou a aplicação de multas. A inexistência de um sistema para gerenciar reservas para livros já emprestados gera frustração entre os leitores e prejudica a organização da demanda por títulos populares. Além disso, a falta de um controle de acesso definido por papéis (administrador, bibliotecário e leitor) impacta a segurança e a eficiência das operações administrativas, limitando a capacidade da biblioteca de otimizar seus serviços e oferecer uma experiência moderna aos seus usuários.

## **Descrição da Solução**

Para sanar essas deficiências e modernizar a gestão da instituição, propõe-se a criação de um Sistema Web de Gerenciamento de Biblioteca. Esta solução permitirá à biblioteca automatizar suas operações diárias, centralizando a gestão de livros, exemplares e usuários.

O sistema será projetado para suportar três tipos de usuários, cada um com níveis de acesso e funcionalidades específicas:

    O Administrador, responsável por gerenciar os usuários bibliotecários, com permissões para criar e excluir seus registros.

O Bibliotecário, que terá controle total sobre o acervo (cadastro, consulta, alteração e exclusão de livros e exemplares), além de gerenciar os leitores e todas as transações de empréstimos, devoluções e reservas.
O Leitor, que poderá acessar o sistema com login para consultar apenas seus próprios empréstimos ativos e o histórico, incluindo as datas de devolução, proporcionando maior autonomia e transparência em suas interações com a biblioteca.

Essa solução não só aumentará a eficiência e a precisão das operações internas, mas também aprimorará significativamente a experiência dos leitores, oferecendo um serviço mais ágil e acessível.

## **Padrão de commits**

Este projeto segue o padrão de **Conventional Commits**, para manter um histórico claro e organizado.

### Tipos de Commits

| Tipo       | Descrição                                                | Exemplo                                                  |
| ---------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `feat`     | Adição de nova funcionalidade                            | `feat(auth): adicionar login com Google`                 |
| `fix`      | Correção de bugs                                         | `fix(api): corrigir erro 500 ao buscar dados`            |
| `docs`     | Atualizações na documentação                             | `docs(readme): atualizar instruções de uso`              |
| `style`    | Mudanças de formatação (sem impacto funcional)           | `style(header): ajustar identação do componente`         |
| `refactor` | Refatorações sem mudança de funcionalidade               | `refactor(user): extrair lógica de validação`            |
| `test`     | Adição ou modificação de testes                          | `test(button): criar testes unitários para o componente` |
| `chore`    | Tarefas diversas (builds, configs, dependências)         | `chore: atualizar dependências do projeto`               |
| `perf`     | Melhorias de performance                                 | `perf(list): otimizar renderização da lista`             |
| `ci`       | Alterações em configurações de integração contínua       | `ci(github): adicionar workflow de build`                |
| `build`    | Mudanças que afetam o processo de build ou empacotamento | `build: configurar Vite para produção`                   |

### Regras

- Uso do formato: `tipo(escopo): descrição breve`
- Escreva com letras **minúsculas**, no **infinitivo ou substantivo**:  
  ✅ `adição do formulário` • ❌ `adicionando formulário`  
- Seja **objetivo e direto** na descrição.


## **Tecnologias usadas**

Frontend: Javascript, React

Backend: Javascript, Express

Banco de Dados: MySQL

IDE: VSCode
