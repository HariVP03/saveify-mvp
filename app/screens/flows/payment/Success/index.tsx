import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Layout, Text } from "../../../../components"
import { AppStackScreenProps } from "../../../../navigators"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { colors, spacing } from "../../../../theme"
import { transformUpiId } from "../../../../utils/common"
import { clear, load, save, StorageKeys } from "../../../../utils/storage"

export const SuccessScreen: React.FC<AppStackScreenProps<"Success">> = observer(
  function SuccessScreen(props) {
    const {
      route: {
        params: { upiString },
      },
      navigation,
    } = props

    useEffect(() => {
      console.log("123")

      load(StorageKeys.TRANSACTIONS).then((res) => {
        save(StorageKeys.TRANSACTIONS, [
          {
            upiString,
            name: transformUpiId(upiString).params.pn.replaceAll("%20", " "),
            amount: transformUpiId(upiString).params.am,
            date: new Date().toISOString(),
            upiId: transformUpiId(upiString).params.pa.replaceAll("%40", "@"),
          },
          ...(res ?? []),
        ])
      })
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
            preset="bold"
            style={$upiName}
            text={transformUpiId(upiString).params.pn.replaceAll("%20", " ")}
          />
          <Text
            style={$upiId}
            preset="bold"
            text={transformUpiId(upiString).params.pa.replaceAll("%40", "@")}
          />

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
