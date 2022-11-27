import { Linking } from "react-native"

/**
 * Helper for opening a give URL
 */
export async function openLink(url: string) {
  return Linking.canOpenURL(url).then((canOpen) => canOpen && !!Linking.openURL(url))
}
