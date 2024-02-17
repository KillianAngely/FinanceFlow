export class UpdateBudgetService {
  async execute(id: number, name: string, amount: number) {
    const response = await fetch(`http://localhost:3000/wallet/${id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    });
    const data = await response.text();
    return data;
  }
}
