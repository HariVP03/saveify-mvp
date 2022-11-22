import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { SafeAreaView, ScrollView, View, ViewStyle } from "react-native"
import { Card, Layout, Text, TextField } from "../../components"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { load, save, StorageKeys } from "../../utils/storage"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import FeatherIcons from "@expo/vector-icons/Feather"
import { colors, spacing } from "../../theme"

const ColorsMapping = {
  over: "red",
  under: "green",
  close: "orange",
}

export const AnalysisScreen: React.FC<TabScreenProps<"Analysis">> = observer(
  function AnalysisScreen(props) {
    const [transactions, setTransactions] = React.useState([])
    const [monthlySpending, setMonthlySpending] = React.useState(null)
    const [newMonthlySpending, setNewMonthlySpending] = React.useState(null)
    const [edit, setEdit] = React.useState(false)

    const amountSpent = useMemo(() => {
      return transactions.reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
    }, [transactions])

    const spendingStatus = useMemo(() => {
      if (amountSpent === null) return null
      if (amountSpent === null) return null
      if (amountSpent > parseFloat(monthlySpending)) return "over"
      if (amountSpent > 0.9 * monthlySpending) return "close"
      if (amountSpent < 0.9 * monthlySpending) return "under"

      return "equal"
    }, [monthlySpending, newMonthlySpending, amountSpent])

    const onEdit = () => {
      setEdit(false)
      save(StorageKeys.MONTHLY_SPENDING, newMonthlySpending)
      setMonthlySpending(newMonthlySpending)
    }

    const refetch = () => {
      load(StorageKeys.TRANSACTIONS).then((transactions) => {
        setTransactions(transactions)
      })

      load(StorageKeys.MONTHLY_SPENDING).then((limit) => {
        setMonthlySpending(limit)
      })
    }

    useEffect(() => {
      refetch()
    }, [])

    return (
      <SafeAreaView style={$container}>
        <ScrollView>
          <Layout title="Analysis" container={{ paddingTop: spacing.extraSmall }}>
            <View style={$header}>
              <Text preset="subheading" text="Monthly spending" />
              {!edit && (
                <EvilIcons
                  onPress={() => {
                    setEdit(true)
                  }}
                  name="pencil"
                  size={40}
                />
              )}
              {edit && (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <FeatherIcons onPress={() => setEdit(false)} name="x" size={32} />
                  <EvilIcons onPress={onEdit} name="check" size={40} />
                </View>
              )}
            </View>

            {!edit && (
              <Text
                preset="heading"
                style={{ color: ColorsMapping[spendingStatus] }}
                text={`₹${amountSpent}/${monthlySpending}`}
              />
            )}

            {edit && (
              <TextField
                autoFocus
                keyboardType="numeric"
                placeholder="Enter your new monthly spending limt"
                onChangeText={(text) => setNewMonthlySpending(isNaN(parseFloat(text)) ? "" : text)}
                value={newMonthlySpending}
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
      </SafeAreaView>
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

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
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
