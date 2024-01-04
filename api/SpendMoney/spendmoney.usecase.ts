import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

export class SpendMoney {
  constructor(private readonly repository: IWalletAggregateRepository) {}

  async execute(id: number, name: string, spend: number) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return "NOT_FOUND";
    }

    const res = wallet.spendMoney(name, spend);
    await this.repository.save(wallet);
  }
}
