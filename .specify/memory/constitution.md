<!--
Sync Impact Report
- Version change: template placeholders → 1.0.0
- Modified principles: Replaced generic [PRINCIPLE_1..5] placeholders with nine named principles (Produto; Clareza e Confiança; UX; UI; Conteúdo; Mobile-First; Acessibilidade; Performance; Técnico).
- Added sections: Declaração de propósito (SECTION_2); Regra final (SECTION_3).
- Removed sections: None (template placeholders removed).
- Templates requiring updates:
  - .specify/templates/plan-template.md — ✅ updated (Constitution Check gates)
  - .specify/templates/spec-template.md — ✅ updated (constitution alignment note)
  - .specify/templates/tasks-template.md — ✅ updated (Polish phase hints)
  - .specify/templates/commands/*.md — ⚠ pending (path not present in repo; no files to update)
- Follow-up TODOs: None.
-->

# Savings Tracker Platform Constitution

## Core Principles

### I. Princípio de Produto

**Toda funcionalidade deve ter objetivo claro de comportamento.**

Cada funcionalidade DEVE existir para incentivar organização financeira, acompanhamento de progresso e continuidade do hábito de poupar. Nada DEVE ser implementado apenas por aparência ou volume de funcionalidades.

Antes de implementar ou manter uma capacidade, a equipe DEVE responder de forma clara: **“Isso ajuda o usuário a economizar melhor?”** Se a resposta não for clara, a funcionalidade DEVE ser removida ou redesenhada.

O sistema DEVE priorizar: criação simples de metas financeiras; acompanhamento visual de progresso; clareza sobre quanto falta para atingir objetivos; reforço positivo de evolução; facilidade para registrar depósitos rapidamente; percepção imediata de controle financeiro.

A complexidade emocional e cognitiva DEVE ser reduzida. O usuário NÃO DEVE ser levado a sentir que o sistema exige mais esforço do que o benefício que entrega.

**Fundamento:** Utilidade real e previsibilidade evitam produto “inchado” e protegem o foco em poupança contínua.

### II. Princípio de Clareza e Confiança

**O produto DEVE transmitir controle financeiro já na primeira tela.**

A dashboard inicial DEVE comunicar imediatamente: quanto o usuário já economizou; quantas metas estão ativas; quantas metas foram concluídas; evolução recente dos depósitos; quais objetivos estão em andamento. O usuário DEVE entender seu cenário financeiro em segundos.

Confiança DEVE ser construída com: dados claros; progresso visível; estados consistentes; feedback imediato; validações explícitas; comportamento previsível da interface. Informações ambíguas, inconsistentes ou vagas NÃO SÃO aceitáveis.

O sistema DEVE parecer confiável antes mesmo de parecer bonito.

**Fundamento:** Poupança pessoal exige percepção de segurança; ambiguidade destrói adoção.

### III. Princípio de UX

**O fluxo principal DEVE ser rápido, intuitivo e sem fricção.**

Criar metas, registrar depósitos e acompanhar progresso são fluxos centrais e DEVEM exigir o mínimo de passos possível.

A interface DEVE favorecer: leitura rápida; tomada de decisão simples; escaneabilidade visual; entendimento imediato de progresso; navegação previsível; estados vazios úteis; estados concluídos motivadores.

O usuário NÃO DEVE precisar “descobrir” como usar o sistema. Formulários DEVEM ser curtos, objetivos e com validação clara. Mensagens genéricas como “erro inesperado” NÃO DEVEM ser aceitas como padrão.

**Fundamento:** Fricção alta interrompe o hábito de poupar.

### IV. Princípio de UI

**Clareza visual DEVE prevalecer sobre estética decorativa.**

O design DEVE transmitir organização, segurança e profissionalismo; a estética DEVE reforçar compreensão, nunca competir com ela.

O sistema DEVE priorizar: hierarquia visual forte; progresso visual evidente; contraste adequado; consistência entre componentes; tipografia legível; espaçamento previsível; feedback visual de interação; estados distintos para metas ativas e concluídas.

Gráficos, barras de progresso e indicadores DEVEM facilitar entendimento, não servir apenas como decoração.

**Fundamento:** Um dashboard bonito porém confuso falha no propósito do produto.

### V. Princípio de Conteúdo

**Conteúdo DEVE ser funcional e orientado à decisão.**

Todo texto da interface DEVE ajudar o usuário a agir com segurança. Textos vagos; placeholders genéricos; labels ambíguas; mensagens artificiais; conteúdo com aparência de protótipo NÃO DEVEM ser aceitos como entrega final.

Os conteúdos DEVEM: orientar ações; reduzir dúvidas; explicar estados; reforçar progresso; incentivar continuidade (por exemplo, celebrar conclusão com mensagem clara e específica, não apenas “Meta concluída”).

**Fundamento:** Copy guia comportamento e reduz erros em valores e datas.

### VI. Princípio Mobile-First

**A experiência mobile é prioridade obrigatória.**

O projeto DEVE ser concebido mobile-first, não apenas adaptado depois. Isso exige: leitura confortável em telas pequenas; formulários rápidos ao toque; navegação simples; dashboard escaneável; gráficos compreensíveis no mobile; CTAs acessíveis sem esforço; excelente usabilidade com uma mão.

Se a experiência mobile falhar, o produto DEVE ser tratado como falho para os propósitos desta constituição.

**Fundamento:** Controle financeiro pessoal ocorre com alta frequência em dispositivos móveis.

### VII. Princípio de Acessibilidade

**Acessibilidade é requisito estrutural, não opcional.**

O sistema DEVE garantir: navegação completa por teclado; estados de foco visíveis; semântica correta; contraste adequado; feedback acessível; formulários compreensíveis; labels corretas; suporte consistente para leitores de tela.

Hover sem equivalente de foco DEVE ser tratado como defeito de implementação.

**Fundamento:** Acessibilidade é parte da qualidade e da confiança percebida.

### VIII. Princípio de Performance

**Performance faz parte da experiência.**

O projeto DEVE priorizar: carregamento rápido; renderização eficiente; interações fluidas; baixo custo cognitivo; estrutura leve; componentes previsíveis. Animações desnecessárias, renderizações pesadas e complexidade visual gratuita DEVEM ser evitadas como falhas de produto.

**Fundamento:** Lentidão reduz confiança em um domínio financeiro.

### IX. Princípio Técnico

**Simplicidade arquitetural com padrão profissional.**

O código DEVE ser construído para manutenção, escalabilidade e previsibilidade com: clean code; componentização consistente; responsabilidade única; estrutura semântica; padronização visual e técnica; legibilidade acima de abstração excessiva; separação clara entre lógica e apresentação; tratamento correto de estados; validação robusta de formulários; organização previsível do projeto.

Hacks, improvisos e complexidade desnecessária NÃO DEVEM ser aceitos como solução sustentável.

**Fundamento:** Sustentabilidade técnica sustenta iterar o produto sem medo.

## Declaração de propósito

Este projeto DEVE ser desenvolvido como uma plataforma profissional de controle de metas financeiras pessoais (Savings Tracker), com foco em clareza, confiança, usabilidade e incentivo à consistência financeira do usuário.

Cada decisão de produto, UX, UI e implementação técnica DEVE priorizar utilidade real, previsibilidade e simplicidade operacional, evitando complexidade desnecessária e qualquer elemento que não contribua diretamente para o objetivo principal: ajudar o usuário a economizar com clareza e continuidade.

O sistema NÃO DEVE apenas registrar metas financeiras — ele DEVE criar percepção imediata de progresso, controle e motivação.

## Regra final

### Beleza sem clareza é falha

### Funcionalidade sem confiança é falha

### Complexidade sem necessidade é falha

Este projeto NÃO DEVE parecer apenas um desafio de interface. Ele DEVE parecer um produto real, utilizável e confiável. A meta NÃO DEVE ser apenas “ficar igual ao design”; a meta DEVE ser construir uma plataforma que o usuário realmente desejaria usar para organizar sua vida financeira.

## Governance

Esta constituição governa decisões de escopo, UX, UI, conteúdo, acessibilidade, performance e arquitetura do Savings Tracker. Quando houver conflito entre conveniência de implementação e estes princípios, os princípios prevalecem até emenda formal.

**Emendas:** Alterações DEVEM ser registradas neste arquivo com incremento de versão semântica (MAJOR: remoção ou redefinição incompatível de princípios; MINOR: novo princípio ou expansão material de orientação; PATCH: clarificações e correções sem mudança de significado). Datas DEVEM usar ISO `YYYY-MM-DD`.

**Revisão de conformidade:** Planos de implementação (`plan.md`) DEVEM incluir verificação explícita contra a seção Constitution Check do template de plano. Especificações e tarefas DEVEM permanecer alinhadas a requisitos testáveis e às restrições desta constituição.

**Version**: 1.0.0 | **Ratified**: 2026-05-11 | **Last Amended**: 2026-05-11
