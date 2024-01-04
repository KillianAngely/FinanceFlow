import { Wallet } from "../domain/Wallet.aggregate";

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

  it("should be able to show wallet", () => {
    expect(() => {
      const result = wallet.budgetConsumtion();
      expect(result).toBe("OK");
    });
  });
});
