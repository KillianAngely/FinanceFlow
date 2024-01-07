import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface IDropWalletPresenter<OkType, NotFoundType> {
  ok(): Promise<OkType>;
  notFound(): Promise<NotFoundType>;
}

export class DropWallet<OkType, NotFoundType> {
  constructor(
    private readonly presenter: IDropWalletPresenter<OkType, NotFoundType>,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(id: number) {
    const wallet = await this.repository.findById(id);

    if (wallet === "NOT_FOUND") {
      return this.presenter.notFound();
    }

    this.repository.remove(wallet);

    return this.presenter.ok();
  }
}
