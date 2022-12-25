import { isRTL } from "expo-localization"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import { Layout, ListItem, Text, Toggle } from "../../../components"
import { TabScreenProps } from "../../../navigators/TabNavigator"
import FeatherIcon from "@expo/vector-icons/Feather"
import { spacing } from "../../../theme"
import { Toast, View } from "native-base"
import { useAuth } from "../../../services/firebase"

export const SettingsScreen: React.FC<TabScreenProps<"Settings">> = observer(
  function SettingsScreen({ navigation }) {
    const { user, logout } = useAuth({
      onSuccess() {
        Toast.show({
          title: "Logged out successfully",
        })
      },

      onError({ message }) {
        Toast.show({
          title: message,
        })
      },
    })

    return (
      <Layout title="Settings">
        <View>
          <Text preset="subheading" text="Permissions" />
          <ListItem
            leftIcon="bell"
            text="Notifications"
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
          />

          <ListItem
            LeftComponent={
              <FeatherIcon
                name="camera"
                size={24}
                color="black"
                style={{
                  marginTop: 16,
                  marginRight: spacing.medium,
                }}
              />
            }
            text="Camera"
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
          />

          <Text preset="subheading" text="Accounts" />
          <ListItem
            leftIcon="lock"
            text={user ? "Log Out" : "Login / Signup"}
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
            onPress={() => {
              if (user) {
                logout()

                return
              }
              navigation.navigate("Login")
            }}
          />
        </View>
      </Layout>
    )
  },
)
