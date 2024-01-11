type Budget = {
  name: string;
  amount: number;
};

export class Wallet {
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
    if (!id) {
      return "INVALID";
    }

    if (!name) {
      return "INVALID";
    }

    const aggregate = new Wallet(id, name, limit, budgets);

    return aggregate;
  }

  private constructor(
    public id: number,
    private name: string,
    private limit: number,
    private budgets: Budget[]
  ) {}

  toDto() {
    return {
      id: this.id,
      name: this.name,
      limit: this.limit,
      budgets: this.budgets.map(({ name, amount }) => ({
        name,
        amount,
      })),
    };
  }

  addBudgets(name: string, amount: number) {
    const totalAmount = this.budgets.reduce(
      (total, budget) => total + budget.amount,
      0
    );
    const newTotalAmount = totalAmount + amount;

    if (newTotalAmount > this.limit) {
      return "BUDGET_LIMIT_EXCEEDED";
    }

    this.budgets.push({ name, amount });

    return "OK";
  }

  removeBudget(name: string) {
    const index = this.budgets.findIndex((budget) => budget.name === name);

    if (index === -1) {
      return "NOT_FOUND";
    }

    this.budgets.splice(index, 1);

    return "OK";
  }

  updateBudget(name: string, amount: number) {
    const index = this.budgets.findIndex((budget) => budget.name === name);

    if (index === -1) {
      return "NOT_FOUND";
    }

    this.budgets[index].amount = amount;

    return "OK";
  }

  spendMoney(name: string, spend: number) {
    const index = this.budgets.findIndex((budget) => budget.name === name);

    if (index === -1) {
      return "NOT_FOUND";
    }

    const totalAmount = this.budgets.reduce(
      (total, budget) => total + budget.amount,
      0
    );

    if (spend > totalAmount) {
      return "INSUFFICIENT_FUNDS";
    }

    this.budgets[index].amount -= spend;

    return "OK";
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
