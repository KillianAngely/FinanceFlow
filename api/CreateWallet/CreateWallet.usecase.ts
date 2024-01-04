import { Wallet } from "../domain/Wallet.aggregate";
import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface ICreateWalletRepository<OkType> {
  ok(): Promise<OkType>;
}
export class CreateWallet<OkType> {
  constructor(
    private readonly presenter: ICreateWalletRepository<OkType>,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(name: string, limit: number) {
    const id = Math.floor(Math.random() * 100000);
    const wallet = new Wallet(id, name, limit, []);

    await this.repository.save(wallet);

    return this.presenter.ok();
  }
}
