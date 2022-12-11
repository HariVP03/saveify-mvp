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

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")

  const { loginWithEmailAndPassword } = useAuth({
    onError({ message }) {
      Toast.show({
        title: message,
      })
    },

    onSuccess() {
      Toast.show({
        title: "Logged in successfully",
      })

      navigation.navigate("Tabs")
    },
  })

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Layout title="Login">
      <Text
        text="Enter your details below to unlock top secret info. 🤫"
        preset="subheading"
        style={$enterDetails}
      />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
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
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        label="Password"
        placeholder="Super secret password here"
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        text="Let's roll!"
        style={$tapButton}
        preset="reversed"
        disabled={!authEmail || !authPassword}
        onPress={() => loginWithEmailAndPassword(authEmail, authPassword)}
      />

      <Pressable onPress={() => navigation.replace("Signup")} style={$signupButton}>
        <Text style={$signupText}>Or signup instead</Text>
      </Pressable>
    </Layout>
  )
})

const $signupButton: ViewStyle = {
  marginTop: spacing.medium,
  justifyContent: "center",
  width: "100%",
}

const $signupText: TextStyle = {
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
