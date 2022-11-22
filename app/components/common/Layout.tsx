import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { Text } from "../Text"
import { Screen } from "../Screen"

interface LayoutProps {
  children: React.ReactNode
  title: string
  fullWidth?: boolean
  style?: ViewStyle
  container?: ViewStyle
}

export function Layout({ children, title, fullWidth, style, container }: LayoutProps) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen
      style={style}
      preset="scroll"
      contentContainerStyle={{ ...$container, ...container }}
      safeAreaEdges={["top"]}
    >
      <Text preset="heading" text={title} style={$title} />

      <View
        style={[
          $bottomContainer,
          $bottomContainerInsets,
          {
            paddingHorizontal: fullWidth ? 0 : spacing.large,
          },
        ]}
      >
        {children}
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  flex: 1,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flex: 1,
}
