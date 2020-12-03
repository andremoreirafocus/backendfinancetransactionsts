import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTrasactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.value, 0);

    const totalOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, transaction) => transaction.value + acc, 0);

    const totalBalance = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance,
    };
  }

  public create({ title, value, type }: CreateTrasactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
