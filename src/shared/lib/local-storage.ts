const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return null
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // quota exceeded or private mode
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch {
      // ignore
    }
  },

  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null
    } catch {
      return false
    }
  },
}

export default storage
