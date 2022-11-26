import { observer } from "mobx-react-lite"
import React from "react"
import { Layout } from "../../../components"
import { TabScreenProps } from "../../../navigators/TabNavigator"

export const OffersScreen: React.FC<TabScreenProps<"Offers">> = observer(function OffersScreen(
  props,
) {
  return (
    <Layout title="Offers">
      <></>
    </Layout>
  )
})
