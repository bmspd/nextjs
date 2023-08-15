export enum TASK_STATUSES {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}

export const TASK_DEFAULT_STATUS = TASK_STATUSES.OPEN
export enum TASK_PRIORITIES {
  HIGHEST = 'HIGHEST',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
export const TASK_DEFAULT_PRIORITY = TASK_PRIORITIES.MEDIUM

export const TASK_STATUSES_OPTIONS = Object.values(TASK_STATUSES).map((el) => ({
  value: el,
  label: el,
}))
export const TASK_PRIORITIES_OPTIONS = Object.values(TASK_PRIORITIES).map((el) => ({
  value: el,
  label: el,
}))
