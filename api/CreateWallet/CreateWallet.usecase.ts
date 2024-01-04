import { error } from "console";
import Wallet from "../domain/wallet";
import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface ICreateWalletRepository<OkType, MissingParams> {
  ok(): Promise<OkType>;
  missingParams(): Promise<MissingParams>;
}
export class CreateWallet<OkType, MissingParams> {
  constructor(
    private readonly presenter: ICreateWalletRepository<OkType, MissingParams>,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(name: string, limit: number) {
    try {
      const id = Math.floor(Math.random() * 100000);
      const wallet = new Wallet(id, name, limit, []);

      await this.repository.save(wallet);

      return this.presenter.ok();
    } catch (error) {
      return this.presenter.missingParams();
    }
  }
}
