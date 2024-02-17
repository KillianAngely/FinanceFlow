import { AddBudgetService } from "../AddBudget/addBudget";
import { CreateWalletService } from "../CreateWallet/createWallet";
import { RemoveBudgetService } from "./removeBudget";

test("Remove a budget", async () => {
  const walletId: number = await new CreateWalletService().execute(
    "My Wallet",
    1000
  );
  const createWallet = await new AddBudgetService().execute(
    walletId,
    "My Budget",
    100
  );
  const result = await new RemoveBudgetService().execute(walletId, "My Budget");

  expect(result).toBe("OK!");
});
