import { Transaction } from "../types"

export function calculateSpendingStatus(amountSpent: number, monthlySpendingLimit: number) {
  if (amountSpent === null) return null

  if (amountSpent > monthlySpendingLimit) return "over"
  if (amountSpent > 0.9 * monthlySpendingLimit) return "close"
  if (amountSpent < 0.9 * monthlySpendingLimit) return "under"

  return "equal"
}

interface TransformedUpiId {
  prefix: string
  raw: string
  params: {
    am: string
    cu: string
    mc: string
    mode: string
    orgid: string
    pa: string
    pn: string
    purpose: string
    sign: string
    tn: string
    tr: string
    url: string
  }
}

export function getUpiQueryParams(upiId: string): TransformedUpiId {
  const [prefix, rest] = upiId.split("://pay?")

  const params = rest.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=", 2)
    ;(acc as any)[key] = value.replace("%20", " ")
    return acc
  }, {})

  // @ts-ignore
  return { prefix, params, raw: upiId }
}

export function getTransactionFromUpiString(upiString: string): Transaction {
  return {
    upiString,
    name: getUpiQueryParams(upiString).params.pn.replaceAll("%20", " "),
    amount: parseFloat(getUpiQueryParams(upiString).params.am),
    date: new Date().toISOString(),
    upiId: getUpiQueryParams(upiString).params.pa.replaceAll("%40", "@"),
  }
}
