export class RemoveBudgetService {
  async execute(walletId: number, budgetName: string) {
    const response = await fetch(
      `http://localhost:3000/wallet/${walletId}/removebudget`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: budgetName }),
      }
    );

    const data = await response.text();

    return data;
  }
}
