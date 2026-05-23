# Feature Specification: Login

**Feature Branch**: `004-login`  
**Created**: 2026-05-16  
**Status**: Draft  
**Input**: User description: "Tela de Login — principal porta de entrada da aplicação, primeiro ponto de contato entre o usuário e o produto. Experiência simples, segura, acessível e consistente com o design system. Funciona em iOS, Android e Web."

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## Clarifications

### Session 2026-05-16

- Q: Links de cadastro e recuperação de senha devem existir na UI desta versão (apontando para rotas futuras) ou ser removidos? → A: Manter links na UI apontando para rotas placeholder (tela vazia ou "em breve").
- Q: O que acontece se um usuário já autenticado acessa a tela de login? → A: Redirecionar automaticamente para a dashboard (usuário autenticado nunca vê a tela de login).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Login com e-mail e senha (Priority: P1)

O usuário abre a aplicação pela primeira vez (ou após logout) e é direcionado para a tela de login. Ele informa seu e-mail e senha nos campos correspondentes e toca no botão "Entrar". O sistema valida as credenciais e, em caso de sucesso, redireciona o usuário para a dashboard principal.

**Why this priority**: Login com e-mail e senha é o fluxo de autenticação mais fundamental. Sem ele, o usuário não consegue acessar nenhuma funcionalidade protegida da aplicação. É o caso de uso mínimo viável para liberar acesso ao produto.

**Independent Test**: Pode ser testado isoladamente inserindo credenciais válidas e verificando o redirecionamento para a dashboard. Entrega valor imediato ao desbloquear o acesso ao produto.

**Acceptance Scenarios**:

1. **Given** o usuário está na tela de login com campos vazios, **When** preenche e-mail e senha válidos e toca em "Entrar", **Then** o sistema autentica o usuário e redireciona para a dashboard principal.
2. **Given** o usuário está na tela de login, **When** informa um e-mail com formato inválido, **Then** o sistema exibe mensagem de validação específica no campo de e-mail antes de enviar a requisição.
3. **Given** o usuário está na tela de login, **When** informa e-mail e/ou senha incorretos, **Then** o sistema exibe mensagem de erro genérica (sem indicar qual campo está incorreto, por segurança) e mantém o usuário na tela de login.
4. **Given** o usuário está na tela de login, **When** toca em "Entrar" com campos vazios, **Then** o sistema exibe mensagens de validação em cada campo obrigatório não preenchido.

---

### User Story 2 - Visualizar/ocultar senha (Priority: P1)

O usuário está preenchendo o campo de senha e deseja conferir o que digitou. Ele toca no ícone de visibilidade para alternar entre senha visível e oculta.

**Why this priority**: Reduz erros de digitação e frustração, especialmente em dispositivos móveis onde o teclado virtual dificulta a conferência. Impacto direto na taxa de sucesso do login.

**Independent Test**: Pode ser testado isoladamente tocando no ícone de visibilidade e verificando que o conteúdo do campo alterna entre texto mascarado e texto visível.

**Acceptance Scenarios**:

1. **Given** o campo de senha contém texto digitado e está oculto (padrão), **When** o usuário toca no ícone de visibilidade, **Then** o texto da senha é exibido em claro e o ícone muda para indicar o estado "visível".
2. **Given** o campo de senha está com texto visível, **When** o usuário toca no ícone de visibilidade novamente, **Then** o texto volta a ser mascarado e o ícone retorna ao estado "oculto".

---

### User Story 3 - Feedback visual de carregamento durante autenticação (Priority: P1)

O usuário tocou em "Entrar" com credenciais preenchidas. Enquanto o sistema processa a autenticação, o botão exibe estado de carregamento e os campos ficam desabilitados para evitar múltiplas submissões.

**Why this priority**: Feedback de carregamento transmite confiança e previne comportamento inesperado. Sem ele, o usuário pode tocar repetidas vezes no botão, gerando requisições duplicadas e confusão.

**Independent Test**: Pode ser testado simulando uma requisição de autenticação e verificando que o botão exibe indicador de carregamento e que os campos ficam desabilitados durante o processamento.

**Acceptance Scenarios**:

1. **Given** o usuário preencheu e-mail e senha válidos, **When** toca em "Entrar", **Then** o botão exibe indicador de carregamento (spinner ou equivalente), os campos de entrada ficam desabilitados e não é possível disparar outra submissão.
2. **Given** o sistema está processando a autenticação, **When** a requisição é concluída (sucesso ou erro), **Then** o estado de carregamento é removido e os campos voltam ao estado editável.

---

### User Story 4 - Navegação para cadastro (Priority: P2)

O usuário ainda não possui conta e deseja se cadastrar. Na tela de login, ele localiza o link "Criar conta" e toca nele. Como a tela de cadastro ainda não foi implementada, o sistema navega para uma rota placeholder. O link deve estar presente na UI para manter a estrutura visual esperada e facilitar integração futura.

**Why this priority**: O ponto de entrada visual para cadastro deve existir desde o início para evitar reestruturação de layout futura. A rota de destino será implementada em feature separada.

**Independent Test**: Pode ser testado isoladamente tocando no link e verificando a navegação para a rota placeholder de cadastro.

**Acceptance Scenarios**:

1. **Given** o usuário está na tela de login, **When** toca no link "Criar conta", **Then** o sistema navega para a rota placeholder de cadastro.

---

### User Story 5 - Navegação para recuperação de senha (Priority: P2)

O usuário esqueceu sua senha. Na tela de login, ele localiza o link "Esqueceu sua senha?" e toca nele. Como o fluxo de recuperação ainda não foi implementado, o sistema navega para uma rota placeholder. O link deve estar presente na UI para manter a estrutura visual esperada e facilitar integração futura.

**Why this priority**: O ponto de entrada visual para recuperação de senha deve existir desde o início. A rota de destino será implementada em feature separada.

**Independent Test**: Pode ser testado isoladamente tocando no link e verificando a navegação para a rota placeholder de recuperação de senha.

**Acceptance Scenarios**:

1. **Given** o usuário está na tela de login, **When** toca em "Esqueceu sua senha?", **Then** o sistema navega para a rota placeholder de recuperação de senha.

---

### User Story 6 - Acessibilidade completa da tela de login (Priority: P2)

O usuário utiliza leitor de tela ou navegação por teclado. Todos os elementos da tela de login devem ser navegáveis, anunciados corretamente e operáveis sem uso de mouse/toque direto.

**Why this priority**: Acessibilidade é requisito estrutural conforme a constituição do projeto. A tela de login é a primeira interação, e falhas de acessibilidade aqui comprometem toda a jornada.

**Independent Test**: Pode ser testado navegando pela tela inteira usando apenas teclado (Tab/Enter) e verificando anúncios do leitor de tela para cada elemento interativo.

**Acceptance Scenarios**:

1. **Given** o usuário navega por teclado, **When** pressiona Tab sequencialmente, **Then** o foco percorre todos os elementos interativos na ordem lógica: e-mail → senha → ícone de visibilidade → "Esqueceu sua senha?" → "Entrar" → "Criar conta".
2. **Given** o usuário utiliza leitor de tela, **When** o foco está em um campo de entrada, **Then** o leitor anuncia o label, o estado (obrigatório, erro, etc.) e instruções relevantes.
3. **Given** o usuário utiliza leitor de tela, **When** uma mensagem de erro de validação aparece, **Then** o leitor anuncia a mensagem de erro automaticamente.

---

### Edge Cases

- O que acontece quando o usuário tenta fazer login sem conectividade de rede? O sistema deve exibir mensagem clara de erro de conexão, distinta de erro de credenciais.
- Como o sistema se comporta quando o serviço de autenticação está indisponível (timeout ou erro de servidor)? Deve exibir mensagem amigável orientando o usuário a tentar novamente.
- O que acontece se o usuário cola um e-mail com espaços no início ou final? O sistema deve fazer trim automático antes da validação.
- Como o teclado virtual se comporta no mobile? O campo de e-mail deve acionar teclado com "@" visível; o campo de senha deve acionar teclado padrão; o botão "Entrar" do teclado no último campo deve submeter o formulário.
- O que acontece quando o usuário pressiona Enter/Return no teclado enquanto preenche o formulário? Deve submeter o formulário se ambos os campos estiverem preenchidos.
- O que acontece se um usuário já autenticado acessa a tela de login (via navegação direta, deep link ou botão voltar)? O sistema redireciona automaticamente para a dashboard — o usuário autenticado nunca visualiza a tela de login.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir a tela de login como tela padrão para usuários não autenticados.
- **FR-002**: O sistema DEVE fornecer campos de entrada para e-mail e senha, com labels claras e visíveis.
- **FR-003**: O sistema DEVE validar o formato do e-mail no lado do cliente antes de submeter a requisição (formato RFC 5322 simplificado).
- **FR-004**: O sistema DEVE exibir mensagens de validação inline, posicionadas junto ao campo correspondente, para erros de preenchimento.
- **FR-005**: O sistema DEVE fazer trim automático do valor do campo de e-mail antes da validação e submissão.
- **FR-006**: O sistema DEVE permitir ao usuário alternar a visibilidade do campo de senha através de ícone interativo.
- **FR-007**: O sistema DEVE exibir estado de carregamento no botão "Entrar" e desabilitar os campos durante o processamento da autenticação.
- **FR-008**: O sistema DEVE exibir mensagem de erro genérica para credenciais inválidas, sem revelar qual campo está incorreto (proteção contra enumeração de contas).
- **FR-009**: O sistema DEVE exibir mensagens de erro distintas para falha de rede e falha de servidor, orientando o usuário sobre a próxima ação.
- **FR-010**: O sistema DEVE fornecer link de navegação "Criar conta" visível na tela de login, apontando para rota placeholder até que a feature de cadastro seja implementada.
- **FR-011**: O sistema DEVE fornecer link de navegação "Esqueceu sua senha?" visível na tela de login, apontando para rota placeholder até que a feature de recuperação de senha seja implementada.
- **FR-012**: O sistema DEVE redirecionar o usuário autenticado com sucesso para a dashboard principal.
- **FR-013**: O sistema DEVE suportar submissão do formulário via botão "Entrar" e via tecla Enter/Return do teclado.
- **FR-014**: O sistema DEVE configurar o tipo de teclado virtual adequado para cada campo (teclado de e-mail com "@" para o campo de e-mail; teclado padrão para senha).
- **FR-015**: O sistema DEVE garantir navegação acessível por teclado com ordem de foco lógica e anúncios corretos para leitores de tela.
- **FR-016**: O sistema DEVE funcionar de forma consistente em iOS, Android e Web, respeitando o design system e os tokens visuais do projeto.
- **FR-017**: O sistema DEVE redirecionar automaticamente para a dashboard principal quando um usuário já autenticado tenta acessar a tela de login (via navegação direta, deep link ou botão voltar).

### Key Entities

- **Credenciais de Login**: Representam os dados informados pelo usuário para autenticação. Atributos principais: endereço de e-mail e senha. Não são persistidas no dispositivo.
- **Sessão de Usuário**: Representa o estado de autenticação ativa após login bem-sucedido. Determina se o usuário tem acesso às funcionalidades protegidas da aplicação.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue completar o fluxo de login (abrir tela → preencher campos → autenticar → chegar à dashboard) em menos de 30 segundos na primeira tentativa com credenciais válidas.
- **SC-002**: 95% dos usuários conseguem fazer login com sucesso na primeira tentativa quando possuem credenciais válidas.
- **SC-003**: 100% dos elementos interativos da tela são navegáveis por teclado e anunciados corretamente por leitores de tela.
- **SC-004**: Mensagens de erro de validação são exibidas em menos de 1 segundo após a interação do usuário com o campo.
- **SC-005**: O estado de carregamento é exibido imediatamente após o toque em "Entrar", prevenindo 100% das submissões duplicadas.
- **SC-006**: A tela de login apresenta aparência e comportamento consistentes em iOS, Android e Web, sem diferenças visuais perceptíveis pelo usuário.
- **SC-007**: A tela é renderizada e interativa em menos de 2 segundos em dispositivos de gama média.

## Assumptions

- O backend de autenticação já existe ou será providenciado paralelamente, expondo endpoints para validação de credenciais. A tela de login será construída independente do backend, utilizando interface/contrato definido.
- O método de autenticação principal é e-mail e senha. Login social (Google, Apple, etc.) não faz parte do escopo desta feature e poderá ser adicionado em feature futura.
- As telas de cadastro e recuperação de senha não existem nesta versão. Os links de navegação estarão presentes na UI mas apontarão para rotas placeholder até que as features respectivas sejam implementadas em releases futuros.
- O design system (tokens de cores, tipografia, espaçamento, raios de borda) já está configurado no projeto via NativeWind/Tailwind e Gluestack UI.
- O usuário possui conectividade de internet para realizar o login (não há modo offline para autenticação).
- A sessão de autenticação será gerenciada por mecanismo seguro (token armazenado de forma segura no dispositivo), mas os detalhes de implementação de armazenamento de sessão são responsabilidade da feature de autenticação, não da tela de login em si.
- O idioma da interface é português brasileiro (pt-BR).
