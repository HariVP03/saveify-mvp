import { observer } from "mobx-react-lite"
import React from "react"
import { EmptyState, Layout } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { Camera } from "expo-camera"
import { Dimensions, ImageStyle, View, ViewStyle } from "react-native"
import { isRTL } from "expo-localization"

export const ScanScreen: React.FC<AppStackScreenProps<"Scan">> = observer(function ScanScreen(
  props,
) {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  React.useEffect(() => {
    requestPermission()
  }, [])

  const handleQrScanned = (upiString: string) => {
    props.navigation.navigate("Amount", { upiString })
  }

  if (!permission?.granted || !permission) {
    return (
      <View style={$cameraContainer}>
        <EmptyState
          preset="generic"
          imageStyle={$emptyStateImage}
          ImageProps={{ resizeMode: "contain" }}
          button="Request Permission"
          buttonOnPress={requestPermission}
          content="Looks like we don't have permission to access your camera..."
        />
      </View>
    )
  }

  return (
    <Layout title="Scan" fullWidth>
      <View style={$cameraContainer}>
        <Camera
          onBarCodeScanned={({ data }) => {
            handleQrScanned(data)
          }}
          style={$camera}
        />
      </View>
    </Layout>
  )
})

const $cameraContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "red",
}

const $camera: ViewStyle = {
  width: Dimensions.get("window").width,
  flex: 1,
  height: "100%",
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
