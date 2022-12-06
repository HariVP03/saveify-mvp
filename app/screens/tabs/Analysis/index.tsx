import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { SafeAreaView, ScrollView, View, ViewStyle } from "react-native"
import { Card, Layout, ListItem, Text, TextField } from "../../../components"
import { TabScreenProps } from "../../../navigators/TabNavigator"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import FeatherIcons from "@expo/vector-icons/Feather"
import { colors, spacing } from "../../../theme"
import { isRTL } from "expo-localization"
import { LocalStorageProvider } from "../../../utils/local-storage/provider"
import { calculateSpendingStatus } from "../../../utils/common"

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
      return calculateSpendingStatus(amountSpent, monthlySpending)
    }, [monthlySpending, newMonthlySpending, amountSpent])

    const onEdit = () => {
      setEdit(false)
      LocalStorageProvider.getInstance().saveMonthlySpending(newMonthlySpending)
      setMonthlySpending(newMonthlySpending)
    }

    const refetch = () => {
      LocalStorageProvider.getInstance()
        .loadMonthTransactions()
        .then((transactions) => setTransactions(transactions))

      LocalStorageProvider.getInstance()
        .loadMonthlySpending()
        .then((limit) => {
          setMonthlySpending(limit)
        })
    }

    useEffect(() => {
      refetch()
    }, [])

    return (
      <Layout title="Analysis">
        <View style={$header}>
          <Text preset="subheading" text="Spent this month" />
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
            text={`₹${amountSpent} / ${monthlySpending}`}
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
        <View style={{ ...$header, marginTop: spacing.medium, marginBottom: 0 }}>
          <Text preset="subheading" text="Spending details" />
        </View>
        <ListItem
          text="Food"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          RightComponent={<Text text="₹400 / 500" style={{ marginTop: spacing.medium }} />}
        />
        <ListItem
          text="Travel"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          RightComponent={<Text text="₹400 / 500" style={{ marginTop: spacing.medium }} />}
        />
        <ListItem
          text="Shopping"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          RightComponent={<Text text="₹400 / 500" style={{ marginTop: spacing.medium }} />}
        />
        <ListItem
          text="Entertainment"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          RightComponent={<Text text="₹400 / 500" style={{ marginTop: spacing.medium }} />}
        />
        <ListItem
          text="Other"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          RightComponent={<Text text="₹400 / 500" style={{ marginTop: spacing.medium }} />}
        />

        <View style={{ ...$header, marginTop: spacing.medium }}>
          <Text preset="subheading" text="Transactions this month" />
          <EvilIcons onPress={refetch} name="refresh" size={40} />
        </View>

        {transactions.map((transaction, idx) => (
          <TransactionCard key={idx} {...transaction} />
        ))}

        <ListItem
          text="Show previous month's transactions"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
        />
      </Layout>
    )
  },
)

interface TransactionCardProps {
  name: string
  upiId: string
  amount: number
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
