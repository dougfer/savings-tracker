# Data Model: Área Logada

**Date**: 2026-06-07 | **Feature**: [spec.md](./spec.md)

## Overview

Esta feature é puramente estrutural (frontend) e não envolve entidades de dados, persistência, ou contratos de API. Não há modelo de dados a ser definido.

## Entities

Nenhuma. A feature implementa exclusivamente:

1. **Estrutura de rotas** — diretórios e arquivos de layout no padrão Expo Router.
2. **Componente Topbar** — UI presentacional compartilhada entre telas da Área Logada.

## Future Considerations

Quando a funcionalidade de autenticação e perfil de usuário for implementada, entidades como `User` e `Session` serão introduzidas em features futuras. A Topbar consumirá esses dados para exibir o avatar e nome do usuário.
