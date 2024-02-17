export class ShowCashService {
  async execute(id: number) {
    const response = await fetch(
      `http://localhost:3000/wallet/${id}/cashspace`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }
}
