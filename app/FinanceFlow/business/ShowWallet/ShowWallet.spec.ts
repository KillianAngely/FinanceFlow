import { CreateWalletService } from "../CreateWallet/createWallet";
import { AddBudgetService } from "../AddBudget/addBudget";
import { ShowWalletService } from "./ShowWallet";

describe("SpendMoneyService", () => {
  it("should return a string", async () => {
    const createWalletService = new CreateWalletService();
    const addBudgetService = new AddBudgetService();
    const ShowWallet = new ShowWalletService();

    const walletId = await createWalletService.execute("test wallet", 300);
    await addBudgetService.execute(walletId, "test budget", 50);
    await addBudgetService.execute(walletId, "xxx", 50);

    const response = await ShowWallet.execute(walletId);
    console.log(response);
    expect(response).toBe("100");
  });
});
