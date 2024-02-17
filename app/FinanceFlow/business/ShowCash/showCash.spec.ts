import { ShowCashService } from "./showCash";
import { CreateWalletService } from "../CreateWallet/createWallet";
import { AddBudgetService } from "../AddBudget/addBudget";

describe("ShowCashService", () => {
  it("should return a string", async () => {
    const createWalletService = new CreateWalletService();
    const addBudgetService = new AddBudgetService();
    const showCashService = new ShowCashService();

    const walletId = await createWalletService.execute("test wallet", 300);
    await addBudgetService.execute(walletId, "test budget", 50);
    await addBudgetService.execute(walletId, "test budget 2", 200);
    const cash = await showCashService.execute(walletId);
    expect(cash).toBe(50);
  });
});
