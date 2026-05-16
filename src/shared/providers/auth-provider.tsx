import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import api from '#/shared/lib/api'
import storage from '#/shared/lib/local-storage'
import { LOCAL_STORAGE_KEYS } from '#/shared/data/local-storage-keys'

export type AuthUser = {
  id: string
  email: string
  [key: string]: unknown
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
}

type AuthContextValue = AuthState & {
  login: (token: string, user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
    const user = storage.get<AuthUser>(LOCAL_STORAGE_KEYS.USER)
    return { token, user, isAuthenticated: !!token }
  })

  const logout = useCallback(() => {
    storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
    storage.remove(LOCAL_STORAGE_KEYS.USER)
    api.setAuthToken(null)
    setState({ token: null, user: null, isAuthenticated: false })
  }, [])

  const login = useCallback((token: string, user: AuthUser) => {
    storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token)
    storage.set(LOCAL_STORAGE_KEYS.USER, user)
    api.setAuthToken(token)
    setState({ token, user, isAuthenticated: true })
  }, [])

  // useEffect(() => {
  //   if (state.token) api.setAuthToken(state.token)
  //   api.setUnauthorizedHandler(() => {
  //     logout()
  //     window.location.href = '/login'
  //   })
  // }, [state.token, logout])

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
