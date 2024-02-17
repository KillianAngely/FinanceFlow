import { SpendMoneyService } from "./spendMoney";
import { CreateWalletService } from "../CreateWallet/createWallet";
import { AddBudgetService } from "../AddBudget/addBudget";

describe("SpendMoneyService", () => {
  it("should return a string", async () => {
    const createWalletService = new CreateWalletService();
    const addBudgetService = new AddBudgetService();
    const spendMoneyService = new SpendMoneyService();

    const walletId = await createWalletService.execute("test wallet", 300);
    await addBudgetService.execute(walletId, "test budget", 50);
    await addBudgetService.execute(walletId, "xxx", 50);
    ///"errrrrrrrrr"
    const response = await spendMoneyService.execute(
      walletId,
      "test budget",
      100
    );
    expect(response).toBe("Unauthorized");
  });
});
