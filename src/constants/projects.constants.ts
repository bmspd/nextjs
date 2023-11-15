export enum PROJECT_PATTERN_TYPES {
  PLANTS = 'plants',
}
export enum PROJECT_PATTERN_COLORS {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

export const PROJECT_PATTERNS_TYPES_OPTIONS = Object.values(PROJECT_PATTERN_TYPES).map((el) => ({
  value: el,
  label: el,
}))

export const PROJECT_PATTERNS_COLORS_OPTIONS = Object.values(PROJECT_PATTERN_COLORS).map((el) => ({
  value: el,
  label: el,
}))
