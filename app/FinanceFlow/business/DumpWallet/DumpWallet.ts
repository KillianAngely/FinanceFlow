export class DumpWalletService {
  async execute(walletId: number) {
    const response = await fetch(
      `http://localhost:3000/wallet/${walletId}/dump`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data = await response.json();
    return data;
  }
}
