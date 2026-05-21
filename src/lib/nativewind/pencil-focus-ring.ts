/**
 * Pencil focus ring — works on web (box-shadow) and iOS/Android (border ring).
 * `native:` = iOS + Android; `web:` = Metro web bundler.
 */
export const pencilFocusRingClasses = [
  'native:data-[focus-visible=true]:border-2',
  'native:data-[focus-visible=true]:border-orange-400',
  'web:data-[focus-visible=true]:shadow-[0_0_0_4px_#FF5722,0_0_0_6px_#101010]',
].join(' ');

/** Checkbox / control focus also sets bg per Pencil Q5Ei9. */
export const pencilFocusRingWithBgClasses = [
  'data-[focus-visible=true]:bg-neutral-900',
  pencilFocusRingClasses,
].join(' ');
