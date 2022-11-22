import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, RouteConfig } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { HomeScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import FeatherIcon from "@expo/vector-icons/Feather"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

export type TabParamList = {
  Home: undefined
  Analysis: undefined
  Offers: undefined
  Profile: undefined
}

interface TabScreensProps {
  name: keyof TabParamList
  component: React.ComponentType<any>
  options: BottomTabNavigationOptions
}

const TabScreens: TabScreensProps[] = [
  {
    component: HomeScreen,
    name: "Home",
    options: {
      tabBarIcon: ({ focused }) => (
        <FeatherIcon size={24} name="home" color={focused && colors.tint} />
      ),
      tabBarLabel: "Home",
    },
  },
  {
    component: HomeScreen,
    name: "Analysis",
    options: {
      tabBarIcon: ({ focused }) => (
        <FeatherIcon size={24} name="book-open" color={focused && colors.tint} />
      ),
      tabBarLabel: "Analysis",
    },
  },
  {
    component: HomeScreen,
    name: "Offers",
    options: {
      tabBarIcon: ({ focused }) => (
        <FeatherIcon size={24} name="tag" color={focused && colors.tint} />
      ),
      tabBarLabel: "Offers",
    },
  },
  {
    component: HomeScreen,
    name: "Profile",
    options: {
      tabBarIcon: ({ focused }) => (
        <FeatherIcon size={24} name="user" color={focused && colors.tint} />
      ),
      tabBarLabel: "Profile",
    },
  },
]

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      {TabScreens.map((screen) => (
        <Tab.Screen key={screen.name} {...screen} />
      ))}
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
