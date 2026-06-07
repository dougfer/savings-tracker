# Feature Specification: Criar Conta

**Feature Branch**: `008-criar-conta`  
**Created**: 2026-06-06  
**Status**: Draft  
**Input**: User description: "Implementar a página de Criar Conta da aplicação. A implementação contempla exclusivamente a camada de frontend da tela, sem integração com backend, APIs ou contratos de cadastro."

Constituição do projeto (produto, UX, UI, conteúdo, mobile-first, a11y, performance, técnico): `.specify/memory/constitution.md`. Requisitos e critérios de sucesso DEVEM permanecer testáveis e alinhados a esses princípios.

## Clarifications

### Session 2026-06-06

- Q: Qual o comprimento mínimo exigido para o campo de senha? → A: 8 caracteres.
- Q: O formulário deve conter checkbox de aceitação de termos de uso/política de privacidade? → A: Não incluir checkbox. O formulário é enxuto, sem termo de aceitação.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Preencher formulário de cadastro com dados básicos (Priority: P1)

O usuário acessa a tela de Criar Conta e preenche os campos obrigatórios: nome, e-mail, senha e confirmação de senha. Ao tocar no botão de cadastro, o formulário é validado e, estando todos os campos corretos, o sistema indica sucesso visualmente. Como esta feature é apenas frontend, a ação finaliza com feedback visual no próprio botão — sem envio a backend.

**Why this priority**: O formulário de cadastro é o fluxo principal da tela. Sem ele, a página não entrega valor algum. É o caso de uso mínimo viável.

**Independent Test**: Pode ser testado isoladamente preenchendo os campos com dados válidos e tocando no botão de cadastro, verificando que o feedback de sucesso é exibido.

**Acceptance Scenarios**:

1. **Given** o usuário está na tela de Criar Conta com campos vazios, **When** preenche nome, e-mail, senha e confirmação de senha válidos e toca em "Criar conta", **Then** o sistema exibe feedback visual de sucesso no botão e mantém o usuário na tela.
2. **Given** o usuário preencheu o formulário, **When** o campo de e-mail contém formato inválido, **Then** o sistema exibe mensagem de validação inline no campo de e-mail antes de processar a submissão.
3. **Given** o usuário preencheu o formulário, **When** os campos de senha e confirmação de senha são diferentes, **Then** o sistema exibe mensagem de validação inline informando que as senhas não conferem.

---

### User Story 2 - Validação dos campos em tempo real (Priority: P1)

O usuário preenche cada campo do formulário e recebe feedback imediato sobre a validade dos dados inseridos. Campos obrigatórios exibem estado de erro quando preenchidos incorretamente ou deixados vazios após interação. A senha é validada quanto ao comprimento mínimo de 8 caracteres.

**Why this priority**: Validação em tempo real reduz erros e frustração, aumentando a taxa de preenchimento correto na primeira tentativa. Impacto direto na experiência do usuário.

**Independent Test**: Pode ser testado preenchendo cada campo com valores inválidos e verificando que mensagens de erro aparecem assim que o campo perde o foco.

**Acceptance Scenarios**:

1. **Given** o usuário interagiu com o campo de nome e o deixou vazio, **When** o campo perde o foco, **Then** o sistema exibe mensagem de validação indicando que o nome é obrigatório.
2. **Given** o usuário digitou uma senha com menos caracteres que o mínimo exigido, **When** o campo perde o foco, **Then** o sistema exibe mensagem de validação indicando o comprimento mínimo.
3. **Given** o usuário digitou um e-mail sem o símbolo "@", **When** o campo perde o foco, **Then** o sistema exibe mensagem de validação de formato inválido.

---

### User Story 3 - Visualizar/ocultar senha (Priority: P1)

O usuário está preenchendo os campos de senha e deseja conferir o que digitou. Ele toca no ícone de visibilidade para alternar entre texto visível e oculto, tanto no campo de senha quanto no campo de confirmação de senha.

**Why this priority**: Reduz erros de digitação e frustração, especialmente em dispositivos móveis. Padrão já estabelecido na tela de login — deve ser mantido para consistência.

**Independent Test**: Pode ser testado tocando no ícone de visibilidade em cada campo de senha e verificando que o conteúdo alterna entre mascarado e visível.

**Acceptance Scenarios**:

1. **Given** o campo de senha contém texto e está oculto (padrão), **When** o usuário toca no ícone de visibilidade, **Then** o texto é exibido em claro e o ícone muda para indicar estado "visível".
2. **Given** o campo de confirmação de senha contém texto e está oculto (padrão), **When** o usuário toca no ícone de visibilidade, **Then** o texto é exibido em claro e o ícone muda para indicar estado "visível".

---

### User Story 4 - Navegação para login (Priority: P2)

O usuário acessou a tela de Criar Conta mas já possui conta. Ele localiza o link "Já tem conta? Entrar" e toca nele. O sistema navega de volta para a tela de login.

**Why this priority**: Prover rota de escape para usuários que acessaram a tela errada reduz frustração e abandono. O link é esperado como padrão de usabilidade.

**Independent Test**: Pode ser testado tocando no link e verificando a navegação para a tela de login.

**Acceptance Scenarios**:

1. **Given** o usuário está na tela de Criar Conta, **When** toca em "Já tem conta? Entrar", **Then** o sistema navega para a tela de login.

---

### User Story 5 - Acessibilidade completa da tela de cadastro (Priority: P2)

O usuário utiliza leitor de tela ou navegação por teclado. Todos os elementos da tela de Criar Conta devem ser navegáveis, anunciados corretamente e operáveis sem uso de mouse/toque direto.

**Why this priority**: Acessibilidade é requisito estrutural conforme a constituição do projeto. A tela de cadastro é porta de entrada para novos usuários, e falhas de acessibilidade aqui excluem usuários com deficiência.

**Independent Test**: Pode ser testado navegando pela tela inteira usando apenas teclado (Tab/Enter) e verificando anúncios do leitor de tela para cada elemento interativo.

**Acceptance Scenarios**:

1. **Given** o usuário navega por teclado, **When** pressiona Tab sequencialmente, **Then** o foco percorre todos os elementos interativos em ordem lógica: nome → e-mail → senha → ícone visibilidade senha → confirmar senha → ícone visibilidade confirmar senha → botão "Criar conta" → link "Já tem conta? Entrar".
2. **Given** o usuário utiliza leitor de tela, **When** o foco está em um campo de entrada, **Then** o leitor anuncia o label, o estado (obrigatório, erro) e instruções relevantes.
3. **Given** o usuário utiliza leitor de tela, **When** uma mensagem de erro de validação aparece, **Then** o leitor anuncia a mensagem de erro automaticamente.

---

### User Story 6 - Feedback visual de carregamento (Priority: P3)

O usuário preencheu o formulário e tocou em "Criar conta". Enquanto o sistema processa a ação (simulada), o botão exibe estado de carregamento e os campos ficam desabilitados para evitar múltiplas submissões.

**Why this priority**: Feedback de carregamento transmite confiança e previne submissões duplicadas. Como não há backend, este comportamento serve como preparação para integração futura e mantém o padrão visual estabelecido na tela de login.

**Independent Test**: Pode ser testado tocando no botão de cadastro e verificando que o botão exibe indicador de carregamento e os campos ficam desabilitados durante o processamento simulado.

**Acceptance Scenarios**:

1. **Given** o usuário preencheu todos os campos corretamente, **When** toca em "Criar conta", **Then** o botão exibe indicador de carregamento e os campos de entrada ficam desabilitados.
2. **Given** o sistema está processando a submissão, **When** o processamento é concluído, **Then** o estado de carregamento é removido e os campos voltam ao estado editável.

---

### Edge Cases

- O que acontece quando o usuário tenta submeter o formulário com todos os campos vazios? O sistema exibe mensagens de validação em todos os campos obrigatórios simultaneamente.
- Como o sistema se comporta quando o usuário cola um valor com espaços no início ou final nos campos de texto? O sistema faz trim automático antes da validação para nome e e-mail.
- O que acontece quando o usuário pressiona Enter/Return no teclado enquanto preenche o formulário? Deve submeter o formulário se todos os campos estiverem preenchidos e válidos.
- Como o teclado virtual se comporta no mobile? Campo de nome aciona teclado de texto padrão; campo de e-mail aciona teclado com "@" visível; campos de senha acionam teclado padrão.
- O que acontece quando um campo de senha está visível e o usuário alterna para outro app? A senha deve voltar ao estado oculto ao retornar ao app (comportamento padrão do sistema operacional, não gerenciado pela aplicação).
- Como o formulário lida com campos muito longos? Campos devem ter limite razoável de caracteres e o texto deve ser truncado visualmente com scroll horizontal no campo quando aplicável.
- O que acontece se o usuário tenta colar no campo de confirmação de senha? Deve permitir colagem normalmente; a validação de igualdade com o campo de senha é feita na submissão e ao perder o foco.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE exibir a tela de Criar Conta como formulário acessível a usuários não autenticados.
- **FR-002**: O sistema DEVE fornecer campos de entrada para nome, e-mail, senha e confirmação de senha, com labels claras e visíveis.
- **FR-003**: O sistema DEVE validar o formato do e-mail no lado do cliente antes de permitir a submissão (formato RFC 5322 simplificado).
- **FR-004**: O sistema DEVE validar que o campo de nome não está vazio e possui comprimento mínimo aceitável.
- **FR-005**: O sistema DEVE validar que a senha possui comprimento mínimo de 8 caracteres.
- **FR-006**: O sistema DEVE validar que os campos de senha e confirmação de senha são idênticos antes de permitir a submissão.
- **FR-007**: O sistema DEVE exibir mensagens de validação inline, posicionadas junto ao campo correspondente, para erros de preenchimento.
- **FR-008**: O sistema DEVE fazer trim automático dos valores dos campos de nome e e-mail antes da validação e submissão.
- **FR-009**: O sistema DEVE permitir ao usuário alternar a visibilidade dos campos de senha e confirmação de senha através de ícone interativo em cada campo.
- **FR-010**: O sistema DEVE exibir estado de carregamento no botão "Criar conta" e desabilitar os campos durante o processamento da submissão.
- **FR-011**: O sistema DEVE fornecer feedback visual de sucesso após a submissão válida do formulário, sem realizar chamada a backend.
- **FR-012**: O sistema DEVE fornecer link de navegação "Já tem conta? Entrar" visível na tela, apontando para a rota de login.
- **FR-013**: O sistema DEVE suportar submissão do formulário via botão "Criar conta" e via tecla Enter/Return do teclado.
- **FR-014**: O sistema DEVE configurar o tipo de teclado virtual adequado para cada campo (teclado de e-mail com "@" para o campo de e-mail; teclado padrão para nome; teclado padrão para senhas).
- **FR-015**: O sistema DEVE garantir navegação acessível por teclado com ordem de foco lógica e anúncios corretos para leitores de tela.
- **FR-016**: O sistema DEVE funcionar de forma consistente em iOS, Android e Web, respeitando o design system e os tokens visuais do projeto.

### Key Entities

- **Dados de Cadastro**: Representam as informações fornecidas pelo usuário para criação de conta. Atributos principais: nome, e-mail, senha. Não são persistidos no dispositivo ou enviados a backend nesta feature.
- **Estado do Formulário**: Representa os valores atuais dos campos, estados de validação (válido, inválido, não tocado) e estado de submissão (ocioso, carregando, concluído). Gerido exclusivamente no frontend.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue preencher todos os campos do formulário e receber feedback de sucesso em menos de 2 minutos.
- **SC-002**: 90% das tentativas de submissão com dados válidos resultam em feedback de sucesso na primeira tentativa.
- **SC-003**: 100% dos elementos interativos da tela são navegáveis por teclado e anunciados corretamente por leitores de tela.
- **SC-004**: Mensagens de erro de validação são exibidas em menos de 1 segundo após o campo perder o foco.
- **SC-005**: O estado de carregamento é exibido imediatamente após o toque em "Criar conta", prevenindo 100% das submissões duplicadas.
- **SC-006**: A tela de Criar Conta apresenta aparência e comportamento consistentes em iOS, Android e Web, sem diferenças visuais perceptíveis.
- **SC-007**: A tela é renderizada e interativa em menos de 2 segundos em dispositivos de gama média.

## Assumptions

- O design system (tokens de cores, tipografia, espaçamento, raios de borda) já está configurado no projeto via NativeWind/Tailwind e Gluestack UI, e deve ser reutilizado sem modificações.
- Os componentes AppInput, AppButton e demais componentes do diretório `src/components/ui/` estão disponíveis e devem ser utilizados conforme os padrões já estabelecidos.
- A rota da tela de Criar Conta é `/sign-up` no sistema de rotas Expo Router, substituindo o placeholder existente em `src/app/sign-up/index.tsx`.
- A tela de login já está implementada e o link "Já tem conta? Entrar" navega para `/login`.
- Não há backend ou API de cadastro disponível. A submissão do formulário resulta apenas em feedback visual de sucesso, sem persistência ou envio de dados.
- O idioma da interface é português brasileiro (pt-BR).
- O layout da tela segue os padrões estabelecidos na tela de login: fundo `bg-neutral-900`, responsivo (empilhado verticalmente em mobile, layout lado a lado em telas grandes com seção decorativa).
- A seção decorativa (QuoteSection) da tela de login não se aplica diretamente ao cadastro, mas um elemento visual equivalente pode ser incluído para consistência do padrão de autenticação.
- Usuários preenchem o formulário com conectividade (modo offline não é suportado nesta versão).
- A arquitetura Feature First é seguida, com a tela residindo em `src/features/sign-up/screens/` e reexportada por `src/app/sign-up/index.tsx`.
