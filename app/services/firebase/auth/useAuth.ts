import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../config"

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
    .catch((error) => onError?.({ code: error.code, message: error.message }))
}

interface CreateUserProps extends BaseAuthProps {}

async function createUser(props: CreateUserProps) {
  const { email, password, onError, onSuccess } = props

  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => onSuccess?.(user))
    .catch((error) => onError?.({ code: error.errorCode, message: error.errorMessage }))
}

interface UseAuthProps {
  onSuccess?: () => void
  onError?: () => void
}

export function useAuth(props?: UseAuthProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  return {
    loginWithEmailAndPassword: (email: string, password: string) =>
      loginWithEmailAndPassword({ email, password, ...props }),
    createUser: (email: string, password: string) => createUser({ email, password, ...props }),
  }
}
