# Research: Dashboard - Resumo da Conta

**Date**: 2026-06-07
**Feature**: [spec.md](./spec.md)

## Decision 1: Gráfico de Barras — Implementação Nativa vs Biblioteca Externa

### Decision

Implementar o gráfico de barras com componentes nativos React Native (`View` + NativeWind/Tailwind), sem dependência de bibliotecas externas de gráficos.

### Rationale

1. **Simplicidade do design**: O design do gráfico (Node ID: `x8XnB` no app.pen) consiste em barras retangulares simples com cornerRadius de 8px, fill `#ff5722` (orange-400), com texto de valor acima e label de mês abaixo. Não há eixos, grades, tooltips interativos ou animações complexas. Cada barra é um `View` com altura proporcional ao valor.

2. **Compatibilidade cross-platform**: Views nativas funcionam identicamente em iOS, Android e Web sem adaptações. Bibliotecas de gráficos frequentemente têm comportamentos inconsistentes entre plataformas ou exigem configurações específicas do Expo.

3. **Aderência ao Design System**: Implementação nativa permite uso direto dos tokens Tailwind do projeto (`bg-orange-400`, `rounded-lg`, etc.), eliminando a necessidade de customizar temas de bibliotecas terceiras.

4. **Manutenibilidade**: O código do gráfico fica sob controle total da equipe, sem dependência de versões de bibliotecas externas ou breaking changes.

5. **Performance**: Views nativas são mais leves que renderizações SVG ou Canvas de bibliotecas de gráficos, resultando em menor custo de renderização e memória.

6. **Precedente no projeto**: O projeto já adota a filosofia de implementar componentes personalizados com primitivas nativas (ex.: `AppProgressBar`, `AppCheckbox`) em vez de depender de bibliotecas prontas.

### Alternatives Considered

| Alternativa | Motivo da Rejeição |
|---|---|
| **Victory Native** | Biblioteca pesada (~200KB), excessiva para barras simples. API complexa para customização visual. Inconsistências reportadas entre plataformas no Expo SDK 54. |
| **react-native-chart-kit** | Dependência de `react-native-svg`. API limitada para customização visual. Não suporta Tailwind/NativeWind. Layout pouco flexível para breakpoints responsivos. |
| **Recharts (Web-only)** | Funciona apenas na Web. Exigiria implementação separada para mobile, violando o princípio de código compartilhado do Expo. |
| **react-native-svg (SVG puro)** | Já está no projeto como dependência, mas SVG adiciona complexidade desnecessária para barras retangulares simples. Views nativas são mais performáticas e diretas. |

### Technical Approach

- Cada barra é um `View` com `className` usando tokens Tailwind
- Altura da barra é calculada proporcionalmente: `(valorDoMes / valorMaximo) * alturaMaximaBarra`
- Altura máxima padrão: 144px (conforme design do app.pen)
- Barras ficam dentro de um container com `justifyContent: 'flex-end'` e `alignItems: 'center'`
- Valores zerados resultam em barra com altura 0 (barra invisível, mas label permanece)

---

## Decision 2: Definição do Período do Gráfico por Breakpoint

### Decision

A lógica de quantos meses exibir (12 em desktop, 6 em tablet/mobile) é controlada no componente de apresentação com base no hook `useResponsive()` já existente no projeto.

### Rationale

- O hook `useResponsive()` (src/hooks/useResponsive.ts:6) já fornece `isDesktop`, `isTablet`, `isMobile` com os breakpoints definidos (768px, 1024px)
- A seleção do array de dados (`slice` dos últimos N meses) ocorre no componente antes da renderização
- A fonte de dados (mock) fornece sempre o histórico completo (12 meses); o componente decide quantos renderizar

---

## Decision 3: Formatação Monetária

### Decision

Utilizar `Intl.NumberFormat` nativo do JavaScript com locale `pt-BR` para formatação de valores monetários.

### Rationale

- API nativa, sem dependências externas
- Consistente com o locale já definido no projeto (`+html.tsx` usa `pt-BR`)
- Suporta iOS, Android e Web
- Formatação: `R$ 1.500,00` (símbolo + valor com separadores de milhar e decimais)

---

## Decision 4: Card Genérico para Active Goals / Goals Completed

### Decision

O design dos cards "Active goals" e "Goals completed" é essencialmente idêntico (diferindo apenas no label, valor e cor do valor). Criar um componente `SummaryCard` genérico que recebe props: `label`, `value`, `valueColor`, `showPattern` (SVG decorativo de fundo).

### Rationale

- Reduz duplicação de código
- Consistente com a sugestão do usuário no input do plan
- O SVG decorativo (`vector.svg` em `src/assets/icons/`) é o mesmo em ambos os cards (position e cor do gradiente variam, mas a forma é idêntica)
