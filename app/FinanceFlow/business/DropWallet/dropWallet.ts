export class DropWalletService {
  async execute(id: number) {
    const response = await fetch(`http://localhost:3000/wallet/${id}/drop`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.text();
    return data;
  }
}
