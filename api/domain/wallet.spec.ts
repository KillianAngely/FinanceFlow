import { Wallet } from "./Wallet.aggregate";

describe("Wallet", () => {
  let wallet: Wallet;

  beforeEach(() => {
    wallet = Wallet.instantiate({
      id: 1,
      name: "My Wallet",
      limit: 1000,
      budgets: [{ name: "clothes", amount: 10 }],
    }) as Wallet;
  });

  it("should throw an error if name missing", () => {
    expect(
      // @ts-expect-error
      Wallet.instantiate({ id: 1, name: "", limit: null, budgets: [] })
    ).toEqual("INVALID");
  });

  it("should throw an error if limit missing", () => {
    expect(
      // @ts-expect-error
      Wallet.instantiate({ id: 1, name: null, limit: 10000, budgets: [] })
    ).toEqual("INVALID");
  });

  it("should add a budget", () => {
    const result = wallet.addBudgets("Groceries", 200);

    expect(result).toBe("OK");
  });

  it("should remove a budget", () => {
    wallet.addBudgets("Groceries", 200);
    wallet.addBudgets("Entertainment", 100);

    const result = wallet.removeBudget("Groceries");

    expect(result).toBe("OK");
  });

  it("should update a budget", () => {
    wallet.addBudgets("Groceries", 200);

    const result = wallet.updateBudget("Groceries", 300);

    expect(result).toBe("OK");
  });

  it("should spend money from a budget", () => {
    wallet.addBudgets("Groceries", 200);

    const result = wallet.spendMoney("Groceries", 150);

    expect(result).toBe("OK");
  });

  it("should return budget consumption", () => {
    wallet.addBudgets("Groceries", 200);
    wallet.addBudgets("Entertainment", 100);

    const result = wallet.budgetConsumtion();

    expect(result).toBe(310);
  });
});
