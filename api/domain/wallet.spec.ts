import Wallet from "./wallet";

describe("Wallet", () => {
  let wallet: Wallet;

  beforeEach(() => {
    wallet = new Wallet(1, "My Wallet", 1000, []);
  });

  it("should throw an error if name missing", () => {
    expect(() => {
      // @ts-expect-error
      new Wallet(1, "", null, []);
    }).toThrow("MISSING_PARAMETERS");
  });

  it("should throw an error if limit missing", () => {
    expect(() => {
      // @ts-expect-error
      new Wallet(1, null, 10000, []);
    }).toThrow("MISSING_PARAMETERS");
  });

  it("should add a budget", () => {
    const result = wallet.addBudget("Groceries", 200);

    expect(result).toBe("OK");
  });

  it("should remove a budget", () => {
    wallet.addBudget("Groceries", 200);
    wallet.addBudget("Entertainment", 100);

    const result = wallet.removeBudget("Groceries");

    expect(result).toBe("OK");
  });

  it("should update a budget", () => {
    wallet.addBudget("Groceries", 200);

    const result = wallet.updateBudget("Groceries", 300);

    expect(result).toBe("OK");
  });

  it("should spend money from a budget", () => {
    wallet.addBudget("Groceries", 200);

    const result = wallet.spendMoney("Groceries", 150);

    expect(result).toBe("OK");
  });

  it("should return budget consumption", () => {
    wallet.addBudget("Groceries", 200);
    wallet.addBudget("Entertainment", 100);

    const result = wallet.budgetConsumtion();

    expect(result).toBe(300);
  });
});
