import { observer } from "mobx-react-lite"
import React from "react"
import { Linking, Platform, TextStyle, View, ViewStyle } from "react-native"
import { Button, Card, Header, Layout, Text, TextField } from "../../../../components"
import { AppStackScreenProps } from "../../../../navigators"
import { colors, spacing } from "../../../../theme"
import { transformUpiId } from "../../../../utils/common"
import { UPI_PREFIX } from "../../../../utils/constants"

export const AmountScreen: React.FC<AppStackScreenProps<"Amount">> = observer(function AmountScreen(
  props,
) {
  const {
    route: {
      params: { upiString },
    },
  } = props

  const [amount, setAmount] = React.useState("")

  const handlePay = async () => {
    let upiId = upiString

    if (!upiId.includes("&am=&") || amount === "0") {
      upiId += `&am=${amount}`
    }

    upiId = upiId.replace("&am=&", `&am=${amount}&`)

    if (Platform.OS === "ios") {
      const gpay = upiId.replace("upi:/", UPI_PREFIX.GOOGLEPAY)
      const paytm = upiId.replace("upi:/", UPI_PREFIX.PAYTM)

      if (!(await Linking.canOpenURL(gpay))) {
        await Linking.openURL(paytm)
      } else {
        await Linking.openURL(gpay)
      }

      props.navigation.navigate("Success", { upiString: upiId })

      return
    }

    await Linking.openURL(upiId)

    props.navigation.navigate("Success", { upiString: upiId })
  }

  return (
    <Layout title="Pay">
      <View style={$upiInfoContainer}>
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
      </View>
      <TextField
        keyboardType="numeric"
        label="Amount"
        placeholder="Enter an amount"
        autoFocus
        containerStyle={$textFieldContainer}
        value={amount}
        onChangeText={(val) => {
          setAmount(isNaN(parseFloat(val)) ? "" : parseInt(val) > 1e5 ? (1e5).toString() : val)
        }}
      />

      <Button
        preset="reversed"
        disabled={amount === ""}
        text={`Pay ₹${(parseFloat(amount) || 0).toFixed(2)}`}
        onPress={handlePay}
      />
    </Layout>
  )
})

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

const $upiInfoContainer: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  backgroundColor: "white",
  padding: spacing.extraSmall,
  borderRadius: 8,
  marginBottom: spacing.medium,
  shadowOpacity: 0.05,
  shadowOffset: { width: 0, height: 0 },
}

const $textFieldContainer: ViewStyle = {
  marginBottom: spacing.medium,
}
