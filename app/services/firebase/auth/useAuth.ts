import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config"

interface BaseAuthProps {
  email: string
  password: string
}

interface LoginWithEmailAndPasswordProps extends BaseAuthProps {}

async function loginWithEmailAndPassword(props: LoginWithEmailAndPasswordProps) {
  const { email, password } = props

  return signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log({ user })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}

interface CreateUserProps extends BaseAuthProps {}

async function createUser(props: CreateUserProps) {
  const { email, password } = props

  return createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log({ user })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}

export function useAuth() {
  return { loginWithEmailAndPassword, createUser }
}
