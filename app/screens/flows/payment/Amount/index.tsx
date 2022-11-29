import { observer } from "mobx-react-lite"
import React, { useMemo } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Layout, Text, TextField } from "../../../../components"
import { AppStackScreenProps } from "../../../../navigators"
import { getTransactionFromUpiString } from "../../../../utils/common"
import { colors, spacing } from "../../../../theme"
import { UPI } from "../../../../utils/upi"

export const AmountScreen: React.FC<AppStackScreenProps<"Amount">> = observer(function AmountScreen(
  props,
) {
  const {
    route: {
      params: { upiString },
    },
  } = props

  const [amount, setAmount] = React.useState("")

  const transaction = useMemo(() => UPI.transformToTransaction(upiString), [upiString])

  const handlePay = async () => {
    const upiDeepLink = await UPI.initiatePayment(upiString, parseFloat(amount))

    props.navigation.navigate("Success", {
      transaction: getTransactionFromUpiString(upiDeepLink),
    })
  }

  return (
    <Layout title="Pay">
      <View style={$upiInfoContainer}>
        <Text preset="bold" style={$upiName} text={transaction.name} />
        <Text style={$upiId} preset="bold" text={transaction.upiId} />
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
