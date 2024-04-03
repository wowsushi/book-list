export enum STORAGE_KEYS {
  USER_LIKE_ITEMS = 'USER_LIKE_ITEMS',
}

export const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value)
}

export const getItem = (key: string): string | null => {
  return localStorage.getItem(key)
}

export const removeItem = (key: string): void => {
  localStorage.removeItem(key)
}
