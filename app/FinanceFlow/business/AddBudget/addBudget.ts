export class AddBudgetService {
  async execute(walletId: number, name: string, amount: number) {
    const response = await fetch(
      `http://localhost:3000/wallet/${walletId}/addbudget`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount }),
      }
    );

    const data = await response.text();

    return data;
  }
}
