/**
 * On touch screens an invisible layer makes an element's tappable area at
 * least 44px, centred on it, without changing how it looks. The element needs
 * `relative` (or any positioning) for the layer to sit on it.
 */
export const TOUCH_TARGET_CLASS =
  'pointer-coarse:after:absolute pointer-coarse:after:top-1/2 pointer-coarse:after:left-1/2 ' +
  'pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2 ' +
  'pointer-coarse:after:w-full pointer-coarse:after:min-w-11 pointer-coarse:after:h-full pointer-coarse:after:min-h-11'
