import Wallet from "../domain/wallet";
import { ShowBudget } from "./ShowBudget.usecase";

describe("Wallet", () => {
  let wallet: Wallet;

  beforeEach(() => {
    wallet = new Wallet(1, "My Wallet", 1000, [
      { name: "clothes", amount: 10 },
    ]);
  });

  it("should be able to shoow wallet", () => {
    expect(() => {
      const result = wallet.budgetConsumtion();
      expect(result).toBe("OK");
    });
  });
});
