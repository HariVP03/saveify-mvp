import { Linking, Platform } from "react-native"
import { UPI_PREFIX } from "../constants"
import { getTransactionFromUpiString } from "../common"

export const UPI = {
  validateString(upiString: string) {
    return upiString.includes("upi:/") && upiString.includes("@")
  },

  transformToTransaction(upiString: string) {
    return getTransactionFromUpiString(upiString)
  },

  async initiatePayment(upiString: string, amount: number) {
    let upiId: string

    if (!upiString.includes("&am=&") || !amount) {
      upiString += `&am=${amount}`
    }

    upiId = upiId.replace("&am=&", `&am=${amount}&`)

    if (Platform.OS === "android") {
      await Linking.openURL(upiId)
      return
    }

    const gpay = upiId.replace("upi:/", UPI_PREFIX.GOOGLEPAY)
    const paytm = upiId.replace("upi:/", UPI_PREFIX.PAYTM)

    if (!(await Linking.canOpenURL(gpay))) {
      await Linking.openURL(paytm)
      return
    }
    await Linking.openURL(gpay)
  },
}
