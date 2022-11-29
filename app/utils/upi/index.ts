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

  async initiatePayment(upiString: string, amount: number): Promise<string> {
    let upiId: string = upiString

    if (!upiString.includes("&am=") || !amount) {
      upiId += `&am=${amount}`
    }

    upiId = upiId.replace("&am=&", `&am=${amount}&`)

    if (Platform.OS === "android") {
      await Linking.openURL(upiId)

      return upiId
    }

    const gpay = upiId.replace("upi:/", UPI_PREFIX.GOOGLEPAY)
    const paytm = upiId.replace("upi:/", UPI_PREFIX.PAYTM)

    if (!(await Linking.canOpenURL(gpay))) {
      await Linking.openURL(paytm)
      return upiId
    }
    await Linking.openURL(gpay)

    return upiId
  },
}
