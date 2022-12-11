import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Pressable, Toast } from "native-base"
import React, { FC, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import {
  Button,
  Icon,
  Layout,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../../../../components"
import { AppStackScreenProps } from "../../../../navigators"
import { useAuth } from "../../../../services/firebase"
import { colors, spacing } from "../../../../theme"

interface SignupScreenProps extends AppStackScreenProps<"Signup"> {}

export const SignupScreen: FC<SignupScreenProps> = observer(function SignupScreen({ navigation }) {
  const [auth, setAuth] = useState<{
    email: string
    password: string
    passwordConfirmation: string
  }>({
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const authPasswordInput = useRef<TextInput>()
  const confirmAuthPasswordInput = useRef<TextInput>()

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState<{
    password: boolean
    passwordConfirmation: boolean
  }>({
    password: true,
    passwordConfirmation: true,
  })

  const { createUser } = useAuth({
    onError({ message }) {
      Toast.show({
        title: message,
      })
    },

    onSuccess() {
      Toast.show({
        title: "Account created successfully",
      })

      navigation.navigate("Tabs")
    },
  })

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden.password ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() =>
              setIsAuthPasswordHidden({
                ...isAuthPasswordHidden,
                password: !isAuthPasswordHidden.password,
              })
            }
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const ConfirmPasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden.passwordConfirmation ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() =>
              setIsAuthPasswordHidden({
                ...isAuthPasswordHidden,
                passwordConfirmation: !isAuthPasswordHidden.passwordConfirmation,
              })
            }
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Layout title="Signup">
      <Text text="Let's get you signed up first!" preset="subheading" style={$enterDetails} />

      <TextField
        value={auth.email}
        onChangeText={(val) => setAuth({ ...auth, email: val })}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        placeholder="Enter your email address"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={auth.password}
        onChangeText={(val) => setAuth({ ...auth, password: val })}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden.password}
        label="Password"
        helper={
          auth.password.length < 6 && auth.password && "Password must be at least 6 characters"
        }
        placeholder="Super secret password here"
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={confirmAuthPasswordInput}
        value={auth.passwordConfirmation}
        onChangeText={(val) => setAuth({ ...auth, passwordConfirmation: val })}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden.passwordConfirmation}
        label="Confirm Password"
        placeholder="Super secret password here"
        helper={
          auth.password !== auth.passwordConfirmation &&
          auth.passwordConfirmation &&
          "Passwords must match"
        }
        RightAccessory={ConfirmPasswordRightAccessory}
      />

      <Button
        testID="login-button"
        text="Sign me up!"
        style={$tapButton}
        preset="reversed"
        disabled={!auth.email || !auth.password || auth.password !== auth.passwordConfirmation}
        onPress={() => createUser(auth.email, auth.password)}
      />

      <Pressable onPress={() => navigation.replace("Login")} style={$loginButton}>
        <Text style={$loginText}>Or login instead</Text>
      </Pressable>
    </Layout>
  )
})

const $loginButton: ViewStyle = {
  marginTop: spacing.medium,
  justifyContent: "center",
  width: "100%",
}

const $loginText: TextStyle = {
  textAlign: "center",
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}
