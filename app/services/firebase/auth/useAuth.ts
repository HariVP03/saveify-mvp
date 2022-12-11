import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../config"
import { AuthErrors } from "./errors"

interface BaseAuthProps {
  email: string
  password: string

  onSuccess?: (user: User) => void
  onError?: (error: { code: string; message: string }) => void
}

interface LoginWithEmailAndPasswordProps extends BaseAuthProps {}

async function loginWithEmailAndPassword(props: LoginWithEmailAndPasswordProps) {
  const { email, password, onError, onSuccess } = props

  return signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => onSuccess?.(user))
    .catch(({ code }) => {
      onError?.({ code: code, message: AuthErrors[code] })
    })
}

interface CreateUserProps extends BaseAuthProps {}

async function createUser(props: CreateUserProps) {
  const { email, password, onError, onSuccess } = props

  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => onSuccess?.(user))
    .catch(({ code }) => {
      onError?.({ code, message: AuthErrors[code] })
    })
}

interface LogoutProps {
  onSuccess?: () => void
  onError?: (error: { code: string; message: string }) => void
}

async function logout(props?: LogoutProps) {
  return auth
    .signOut()
    .then(() => props.onSuccess?.())
    .catch(({ code }) => {
      props.onError?.({ code, message: AuthErrors[code] })
    })
}

interface UseAuthProps {
  onSuccess?: (user?: User) => void
  onError?: (error: { code: string; message: string }) => void
}

export function useAuth(props?: UseAuthProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  return {
    user,
    loginWithEmailAndPassword: (email: string, password: string) =>
      loginWithEmailAndPassword({ email, password, ...props }),
    createUser: (email: string, password: string) => createUser({ email, password, ...props }),
    logout: () => logout(props),
  }
}
