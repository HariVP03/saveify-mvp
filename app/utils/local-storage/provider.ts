import { Transaction } from "../../types"
import { load, save, StorageKeys } from "../storage"

export class LocalStorageProvider {
  static instance: LocalStorageProvider | undefined

  static getInstance() {
    if (this.instance) return this.instance

    this.instance = new LocalStorageProvider()
    return this.instance
  }

  async loadTransactions(): Promise<Transaction[]> {
    return await load(StorageKeys.TRANSACTIONS)
  }

  async loadMonthTransactions(month?: number): Promise<Transaction[]> {
    const transactions = await this.loadTransactions()
    const currentMonth = month ?? new Date().getMonth()

    return transactions.filter(
      (transactions) => new Date(transactions.date).getMonth() === currentMonth,
    )
  }

  async loadMonthlySpending(): Promise<number> {
    return await load(StorageKeys.MONTHLY_SPENDING)
  }

  async saveMonthlySpending(spending: number): Promise<boolean> {
    return await save(StorageKeys.MONTHLY_SPENDING, spending)
  }

  async saveTransaction(transaction: Transaction): Promise<boolean> {
    const transactions = [transaction, ...(await this.loadTransactions())]

    return await save(StorageKeys.TRANSACTIONS, transactions)
  }
}
