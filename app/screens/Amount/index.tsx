import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Card, Header, Layout, Text, TextField } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"

export const AmountScreen: React.FC<AppStackScreenProps<"Amount">> = observer(function AmountScreen(
  props,
) {
  const {
    route: {
      params: { upiString },
    },
  } = props

  const [amount, setAmount] = React.useState("")

  return (
    <Layout title="Pay">
      <View style={$upiInfoContainer}>
        <Text preset="subheading" style={$upiName} text="PM Modi" />
        <Text style={$upiId} preset="bold" text="pm@upi" />
      </View>
      <TextField
        keyboardType="numeric"
        label="Amount"
        placeholder="Enter an amount"
        autoFocus
        containerStyle={$textFieldContainer}
        value={amount}
        onChangeText={(val) => setAmount(isNaN(parseFloat(val)) ? "" : val)}
      />

      <Button preset="reversed" text={`Pay ₹${(parseFloat(amount) || 0).toFixed(2)}`} />
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
}

const $textFieldContainer: ViewStyle = {
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.medium,
  height: 100,
}
