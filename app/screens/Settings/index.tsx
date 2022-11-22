import { isRTL } from "expo-localization"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme, View } from "react-native"
import { Layout, ListItem, Text, Toggle } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import FeatherIcon from "@expo/vector-icons/Feather"
import { spacing } from "../../theme"

export const SettingsScreen: React.FC<TabScreenProps<"Settings">> = observer(
  function SettingsScreen(props) {
    return (
      <Layout title="Settings">
        <View>
          <Text preset="subheading" text="Accounts" />
          <ListItem
            leftIcon="community"
            text="Profile"
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
          />

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
                style={{
                  marginTop: 16,
                  marginRight: spacing.medium,
                }}
              />
            }
            text="Camera"
            rightIcon={isRTL ? "caretLeft" : "caretRight"}
          />
        </View>
      </Layout>
    )
  },
)
