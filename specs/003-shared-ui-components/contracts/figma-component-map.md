# Figma → Component Mapping

**Figma File**: [savings-tracker](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker)  
**fileKey**: `UtM4hqbnpAz8GAmCUO3ERr`

## Component Nodes

| Component | Node ID | Figma URL | Extraction Status |
|-----------|---------|-----------|-------------------|
| Button | `271:3896` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-3896) | Pending (API 429 during planning) |
| Checkbox | `291:1557` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=291-1557) | Pending |
| Dropdown Menu | `271:996` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=271-996) | Pending |
| ProgressBar | `297:1695` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=297-1695) | Pending |
| Input | `307:1217` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=307-1217) | Pending |
| Avatar | `357:8000` | [Open](https://www.figma.com/design/UtM4hqbnpAz8GAmCUO3ERr/savings-tracker?node-id=357-8000) | Pending |

## Design Token Nodes (from spec 002)

| Area | Node ID | Status |
|------|---------|--------|
| Colors | `271:2935` | Extracted → `tailwind.config.js` |
| Typography | `271:2905` | Extracted → `tailwind.config.js` |
| Spacing | `271:3209` | Extracted → `tailwind.config.js` |
| Radius | `271:3317` | Extracted → `tailwind.config.js` |

## Extraction Protocol

For each component node, extract via Figma MCP (`get_figma_data`):

1. **Variants**: All visual variants (e.g., primary/secondary/outline/destructive for Button)
2. **Sizes**: All size presets with exact dimensions (height, padding, font size, icon size)
3. **States**: Default, hover, pressed, focused, disabled, error (as applicable)
4. **Colors**: Map fills/strokes to existing design tokens in `tailwind.config.js`
5. **Typography**: Map text styles to existing `fontSize` tokens
6. **Spacing**: Map padding/gap to existing `spacing` tokens
7. **Radius**: Map corner radius to existing `borderRadius` tokens

If a Figma value does not match an existing token, document it and evaluate whether to:
- Add a new token to `tailwind.config.js` (if it's a deliberate design decision)
- Adjust to the nearest existing token (if it's a Figma imprecision)
- Escalate to design for clarification

## Per-Component Extraction Template

To be filled during implementation task for each component:

```markdown
### [Component Name]

#### Variants
| Variant | Background | Text Color | Border | Radius |
|---------|------------|------------|--------|--------|
| ... | `token` | `token` | `token` | `token` |

#### Sizes
| Size | Height | Padding H | Padding V | Font Size | Icon Size |
|------|--------|-----------|-----------|-----------|-----------|
| ... | `token` | `token` | `token` | `token` | `token` |

#### States
| State | Opacity | Background Override | Border Override |
|-------|---------|---------------------|-----------------|
| ... | ... | `token` | `token` |
```
