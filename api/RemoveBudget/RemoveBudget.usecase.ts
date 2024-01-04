import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface IRemoveWalletInterface<OkType, NotFoundType> {
  ok(): Promise<OkType>;
  notFound(): Promise<NotFoundType>;
}

export class removeBudget<OkType, NotFoundType> {
  constructor(
    private readonly presenter: IRemoveWalletInterface<OkType, NotFoundType>,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(id: number, name: string) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return this.presenter.notFound();
    }

    const res = wallet.removeBudget(name);

    await this.repository.save(wallet);

    return this.presenter.ok();
  }
}
