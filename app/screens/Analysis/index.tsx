import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { Card, Layout, Text, TextField } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { load, StorageKeys } from "../../utils/storage"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { colors, spacing } from "../../theme"

export const AnalysisScreen: React.FC<TabScreenProps<"Analysis">> = observer(
  function AnalysisScreen(props) {
    const [transactions, setTransactions] = React.useState([])
    const [monthlySpending, setMonthlySpending] = React.useState(null)
    const [edit, setEdit] = React.useState(false)

    const amountSpent = useMemo(() => {
      return transactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
    }, [transactions])

    const refetch = () => {
      load(StorageKeys.TRANSACTIONS).then((transactions) => {
        setTransactions(transactions)
      })

      load(StorageKeys.MONTHLY_SPENDING).then((limit) => {
        setMonthlySpending(limit)
      })
    }

    useEffect(() => {
      load(StorageKeys.TRANSACTIONS).then((res) => {
        setTransactions(res)
      })
    }, [])

    return (
      <ScrollView>
        <Layout title="Analysis">
          <View style={$header}>
            <Text preset="subheading" text="Monthly spending" />
            {!edit && <EvilIcons onPress={() => setEdit(true)} name="pencil" size={40} />}
            {edit && <EvilIcons onPress={() => setEdit(false)} name="check" size={40} />}
          </View>

          {!edit && (
            <Text
              preset="heading"
              style={{ color: "green" }}
              text={`₹${amountSpent}/${monthlySpending}`}
            />
          )}

          {edit && (
            <TextField
              autoFocus
              keyboardType="numeric"
              placeholder="Enter your new monthly spending limt"
            />
          )}

          <View style={{ ...$header, marginTop: spacing.medium }}>
            <Text preset="subheading" text="Your transactions" />
            <EvilIcons onPress={refetch} name="refresh" size={40} />
          </View>

          {transactions.map((transaction, idx) => (
            <TransactionCard key={idx} {...transaction} />
          ))}
        </Layout>
      </ScrollView>
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
