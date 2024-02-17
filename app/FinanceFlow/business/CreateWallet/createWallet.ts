export class CreateWalletService {
  async execute(name: string, limit: number) {
    const response = await fetch("http://localhost:3000/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, limit }),
    });

    const data = await response.json();
    return data.walletId;
  }
}
