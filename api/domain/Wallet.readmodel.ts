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

  toDto() {
    return {
      id: this.id,
      name: this.name,
      limit: this.limit,
      budgets: this.budgets.map(() => {
        return {
          name: this.name,
          amount: this.limit,
        };
      }),
    };
  }
}
