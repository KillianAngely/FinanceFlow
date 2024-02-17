import { CreateWalletService } from "../CreateWallet/createWallet";
import { DropWalletService } from "./dropWallet";

test("Update a budget", async () => {
  const walletId: number = await new CreateWalletService().execute(
    "My Wallet",
    1000
  );
  const result = await new DropWalletService().execute(walletId);

  expect(result).toBe("OK!");
});
