import { observer } from "mobx-react-lite"
import React from "react"
import { Layout } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"

export const SettingsScreen: React.FC<TabScreenProps<"Settings">> = observer(
  function SettingsScreen(props) {
    return (
      <Layout title="Settings">
        <></>
      </Layout>
    )
  },
)
