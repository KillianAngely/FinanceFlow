import { CreateWalletService } from "../CreateWallet/createWallet";
import { AddBudgetService } from "../AddBudget/addBudget";
import { DumpWalletService } from "./DumpWallet";

describe("SpendMoneyService", () => {
  it("should return a string", async () => {
    const createWalletService = new CreateWalletService();
    const addBudgetService = new AddBudgetService();
    const DumpWallet = new DumpWalletService();

    const walletId = await createWalletService.execute("test wallet", 300);
    await addBudgetService.execute(walletId, "test budget", 50);
    await addBudgetService.execute(walletId, "xxx", 50);

    const response = await DumpWallet.execute(walletId);
    console.log(response);
    expect(typeof response).toBe("object");
  });
});
