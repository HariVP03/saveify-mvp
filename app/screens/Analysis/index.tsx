import { observer } from "mobx-react-lite"
import React from "react"
import { Layout } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"

export const AnalysisScreen: React.FC<TabScreenProps<"Analysis">> = observer(
  function AnalysisScreen(props) {
    return (
      <Layout title="Analysis">
        <></>
      </Layout>
    )
  },
)
