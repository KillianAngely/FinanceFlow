import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface IShowBugetPresenter<OkType, NotFoundType> {
  ok(res: number): Promise<OkType>;
  notFound(): Promise<NotFoundType>;
}

export class ShowBudget<OkType, NotFoundType> {
  constructor(
    private readonly presenter: IShowBugetPresenter<OkType, NotFoundType>,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(id: number) {
    const wallet = await this.repository.findById(id);

    if (wallet === "NOT_FOUND") {
      return this.presenter.notFound();
    }

    return this.presenter.ok(wallet.budgetConsumtion());
  }
}
