import { isRTL } from "expo-localization"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme, View } from "react-native"
import { Layout, ListItem, Text, Toggle } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import FeatherIcon from "@expo/vector-icons/Feather"

export const SettingsScreen: React.FC<TabScreenProps<"Settings">> = observer(
  function SettingsScreen(props) {
    const [lightMode, setLightMode] = React.useState(false)

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
                style={{
                  marginTop: 16,
                  marginRight: 16,
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
