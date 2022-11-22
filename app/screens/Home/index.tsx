import { isRTL } from "expo-localization"
import { observer } from "mobx-react-lite"
import React from "react"
import { View, ImageStyle, TextStyle, ViewStyle, Image } from "react-native"
import { Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"

export const HomeScreen: React.FC<TabScreenProps<"Home">> = observer(function HomeScreen(props) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <Text preset="heading" text="Home" style={$title} />

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
}

const $bottomContainer: ViewStyle = {}
