import { AddBudgetService } from "../AddBudget/addBudget";
import { CreateWalletService } from "../CreateWallet/createWallet";
import { UpdateBudgetService } from "./updateBudget";

test("Update a budget", async () => {
  const walletId: number = await new CreateWalletService().execute(
    "My Wallet",
    1000
  );
  const createWallet = await new AddBudgetService().execute(
    walletId,
    "My Budget",
    100
  );
  const result = await new UpdateBudgetService().execute(
    walletId,
    "My Budget",
    200
  );

  expect(result).toBe("OK!");
});
