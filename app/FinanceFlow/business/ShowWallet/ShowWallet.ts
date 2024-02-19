export class ShowWalletService {
  async execute(walletId: number) {
    const response = await fetch(
      `http://localhost:3000/wallet/${walletId}/show`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.text();
    return data;
  }
}
