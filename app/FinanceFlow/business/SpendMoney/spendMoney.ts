export class SpendMoneyService {
  async execute(id: number, name: string, spend: number) {
    const response = await fetch(`http://localhost:3000/wallet/${id}/spend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, spend }),
    });
    const data = await response.text();
    return data;
  }
}
