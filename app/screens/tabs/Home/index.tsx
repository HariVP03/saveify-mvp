import { observer } from "mobx-react-lite"
import React from "react"
import { ViewStyle } from "react-native"
import { Button, Layout, Text } from "../../../components"
import { TabScreenProps } from "../../../navigators/TabNavigator"
import { spacing } from "../../../theme"
import FeatherIcon from "@expo/vector-icons/Feather"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { View } from "native-base"
import { useAuth } from "../../../services/firebase"

export const HomeScreen: React.FC<TabScreenProps<"Home">> = observer(function HomeScreen(props) {
  const { navigation } = props

  return (
    <Layout title="Home">
      <Text
        text="Hiya, Welcome to Saveify! Let us know about your experience with us... 👀"
        size="md"
      />

      <View style={$buttonContainer}>
        <Button
          LeftAccessory={() => (
            <FeatherIcon size={14} style={$buttonIcon} name="send" color="white" />
          )}
          style={$button}
          preset="reversed"
          onPress={() => navigation.navigate("Scan")}
          text="Pay"
        />
        <Button
          LeftAccessory={() => (
            <MaterialIcons size={14} style={$buttonIcon} name="qr-code" color="black" />
          )}
          disabled
          style={$button}
          preset="default"
          text="Receive"
        />
      </View>
    </Layout>
  )
})

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}

const $buttonIcon: ViewStyle = {
  marginRight: spacing.small,
}

const $button: ViewStyle = {
  margin: spacing.medium,
  width: 130,
  height: 50,
}
