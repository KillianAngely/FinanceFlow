import { Wallet } from "../domain/Wallet.aggregate";
import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface ICreateWalletRepository<OkType, InvalidType> {
  ok(id: number): Promise<OkType>;
  invalid(): Promise<InvalidType>;
}
export class CreateWallet<OkType, InvalidType> {
  constructor(
    private readonly presenter: ICreateWalletRepository<OkType, InvalidType>,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(name: string, limit: number) {
    const id = Math.floor(Math.random() * 100000);
    const wallet = Wallet.instantiate({ id, name, limit, budgets: [] });
    if (wallet === "INVALID") {
      return this.presenter.invalid();
    }

    await this.repository.save(wallet);

    return this.presenter.ok(id);
  }
}
