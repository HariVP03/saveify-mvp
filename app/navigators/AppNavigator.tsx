import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { WelcomeScreen, ScanScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { TabNavigator } from "./TabNavigator"

export type AppStackParamList = {
  Home: undefined
  Scan: undefined
  Amount: undefined
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Scan" component={ScanScreen} />
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
