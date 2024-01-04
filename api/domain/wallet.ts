type Objective = {
  name: string;
  amount: number;
};

class Wallet {
  constructor(
    public id: number,
    public name: string,
    public limit: number,
    public budget: Objective[]
  ) {
    if (!this.name || !this.limit) {
      throw new Error("MISSING PARAMS");
    }
  }

  addBudget(name: string, amount: number) {
    const totalAmount = this.budget.reduce(
      (total, budget) => total + budget.amount,
      0
    );
    const newTotalAmount = totalAmount + amount;

    if (newTotalAmount > this.limit) {
      return "BUDGET_LIMIT_EXCEEDED";
    }

    this.budget.push({ name, amount });

    return "OK";
  }

  removeBudget(name: string) {
    const index = this.budget.findIndex((budget) => budget.name === name);

    if (index === -1) {
      return "NOT_FOUND";
    }

    this.budget.splice(index, 1);

    return "OK";
  }

  updateBudget(name: string, amount: number) {
    const index = this.budget.findIndex((budget) => budget.name === name);

    if (index === -1) {
      return "NOT_FOUND";
    }

    this.budget[index].amount = amount;

    return "OK";
  }

  spendMoney(name: string, spend: number) {
    const index = this.budget.findIndex((budget) => budget.name === name);

    if (index === -1) {
      return "NOT_FOUND";
    }

    const totalAmount = this.budget.reduce(
      (total, budget) => total + budget.amount,
      0
    );

    if (spend > totalAmount) {
      return "INSUFFICIENT_FUNDS";
    }

    this.budget[index].amount -= spend;

    return "OK";
  }

  budgetConsumtion() {
    return this.limit - this.sumBudget();
  }

  private sumBudget() {
    const totalAmount = this.budget.reduce(
      (total, budget) => total + budget.amount,
      0
    );
    const remainingAmount = this.limit - totalAmount;
    return remainingAmount;
  }
}

export default Wallet;
