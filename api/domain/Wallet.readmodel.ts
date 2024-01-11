type Budget = {
  name: string;
  amount: number;
};

export class WalletReadModel {
  static instantiate({
    budgets,
    id,
    limit,
    name,
  }: {
    id: number;
    name: string;
    limit: number;
    budgets: { name: string; amount: number }[];
  }) {
    const rm = new WalletReadModel(id, name, limit, budgets);

    return rm;
  }

  private constructor(
    public id: number,
    private name: string,
    private limit: number,
    private budgets: Budget[]
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getLimit() {
    return this.limit;
  }

  getBudgets() {
    return this.budgets.map(({ amount, name }) => ({
      name,
      amount,
    }));
  }

  budgetConsumtion() {
    return this.limit - this.sumBudget();
  }

  sumBudget() {
    const totalAmount = this.budgets.reduce(
      (total, budget) => total + budget.amount,
      0
    );
    const remainingAmount = this.limit - totalAmount;
    return remainingAmount;
  }
}
