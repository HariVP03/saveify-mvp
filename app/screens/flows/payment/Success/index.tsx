import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Layout, Text } from "../../../../components"
import { AppStackScreenProps } from "../../../../navigators"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { colors, spacing } from "../../../../theme"
import { LocalStorageProvider } from "../../../../utils/local-storage"

export const SuccessScreen: React.FC<AppStackScreenProps<"Success">> = observer(
  function SuccessScreen(props) {
    const {
      route: {
        params: { transaction },
      },
      navigation,
    } = props

    useEffect(() => {
      LocalStorageProvider.getInstance().saveTransaction(transaction)
    }, [])

    return (
      <Layout title="" fullWidth>
        <View style={$container}>
          <EvilIcons name="check" size={128} color={"green"} />
          <Text
            style={{ marginVertical: spacing.medium, fontSize: 24 }}
            preset="bold"
            text="Payment Successfull!"
          />
          <Text
            style={{ fontSize: 32, marginVertical: spacing.medium }}
            preset="heading"
            text={`₹ ${transaction.amount}`}
          />
          <Text preset="bold" style={$upiName} text={transaction.name} />
          <Text style={$upiId} preset="bold" text={transaction.upiId} />

          <Text preset="bold" text={new Date().toLocaleString()} />
          <Button
            onPress={() => navigation.navigate("Tabs")}
            style={{ marginTop: spacing.huge }}
            preset="default"
            text="Go back"
          />
        </View>
      </Layout>
    )
  },
)

const $upiId: TextStyle = {
  marginRight: spacing.small,
  width: "100%",
  textAlign: "center",
}

const $upiName: TextStyle = {
  color: colors.tint,
  marginRight: spacing.small,
  width: "100%",
  textAlign: "center",
}

const $container: ViewStyle = {
  flex: 1,
  marginTop: spacing.massive,
  alignItems: "center",
}
