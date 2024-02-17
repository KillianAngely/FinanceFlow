import { CreateWalletService } from "./createWallet";

test("Create Wallet", () => {
  const walletId = new CreateWalletService().execute("My Wallet", 1000);
  expect(walletId).toBeDefined();
});
