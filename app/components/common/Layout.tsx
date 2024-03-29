import React from "react"
import { SafeAreaView, View, ViewStyle, TextStyle, ScrollView, Dimensions } from "react-native"
import { colors, spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { Text } from "../Text"
import { Screen } from "../Screen"
import { SafeAreaProvider } from "react-native-safe-area-context"

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
    <SafeAreaProvider style={$safeArea}>
      <ScrollView style={{ flex: 1 }}>
        <Screen
          style={{
            ...style,
            minHeight: Dimensions.get("screen").height - 200,
          }}
          // preset="scroll"
          contentContainerStyle={{ ...container, ...$container }}
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
      </ScrollView>
    </SafeAreaProvider>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.extraLarge + spacing.large,
  flex: 1,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flex: 1,
}
const $safeArea: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
