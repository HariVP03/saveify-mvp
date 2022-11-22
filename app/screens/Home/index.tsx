import { observer } from "mobx-react-lite"
import React from "react"
import { Layout, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"

export const HomeScreen: React.FC<TabScreenProps<"Home">> = observer(function HomeScreen(props) {
  return (
    <Layout title="Home">
      <Text tx="welcomeScreen.postscript" size="md" />
    </Layout>
  )
})
