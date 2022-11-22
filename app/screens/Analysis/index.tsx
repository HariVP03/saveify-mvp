import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Card, Layout, Text } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { load, StorageKeys } from "../../utils/storage"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { colors, spacing } from "../../theme"

export const AnalysisScreen: React.FC<TabScreenProps<"Analysis">> = observer(
  function AnalysisScreen(props) {
    const [transactions, setTransactions] = React.useState([])

    const refetch = () => {
      load(StorageKeys.TRANSACTIONS).then((transactions) => {
        setTransactions(transactions)
      })
      console.log(transactions)
    }

    useEffect(() => {
      load(StorageKeys.TRANSACTIONS).then((res) => {
        setTransactions(res)
      })
    }, [])

    return (
      <Layout title="Analysis">
        <View style={$header}>
          <Text preset="subheading" text="Your transactions" />
          <EvilIcons onPress={refetch} name="refresh" size={40} />
        </View>

        {transactions.map((transaction, idx) => (
          <TransactionCard key={idx} {...transaction} />
        ))}
      </Layout>
    )
  },
)

interface TransactionCardProps {
  name: string
  upiId: string
  amount: string
  date: string
  status?: "SENT" | "RECEIVED"
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  amount,
  date,
  name,
  status = "SENT",
  upiId,
}) => {
  return (
    <Card
      style={$card}
      content={`${upiId}`}
      heading={`${name}`}
      footer={`₹${amount} | ${new Date(date).toLocaleString()}`}
      headingStyle={{ color: colors.tint }}
    />
  )
}

const $card: ViewStyle = {
  borderRadius: 1,
}

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.medium,
}
