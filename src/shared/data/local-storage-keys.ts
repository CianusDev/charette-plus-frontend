export const LOCAL_STORAGE_KEYS = {
  THEME: 'theme',
  LOCALE: 'locale',
} as const

export type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS]
