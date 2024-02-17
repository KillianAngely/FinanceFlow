import { AddBudgetService } from "./addBudget";
import { CreateWalletService } from "../CreateWallet/createWallet";

test("Add a budget", async () => {
  const walletId = await new CreateWalletService().execute("My Wallet", 1000);
  const result = await new AddBudgetService().execute(
    walletId,
    "My Budget",
    100
  );
  expect(result).toBe("OK!");
});
