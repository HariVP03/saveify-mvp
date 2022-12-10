import { useToast } from "native-base"

export function Toast() {
  const toast = useToast()

  toast.show({})
}
