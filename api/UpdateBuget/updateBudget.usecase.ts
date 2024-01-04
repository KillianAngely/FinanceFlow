import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface IupdateBudgetPresenter<OkType, NotFoundType> {
  ok(): Promise<OkType>;
  notFound(): Promise<NotFoundType>;
}

export class updateBudget<OkType, NotFoundType> {
  constructor(
    private readonly presenter: IupdateBudgetPresenter<OkType, NotFoundType>,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(id: number, name: string, amount: number) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return this.presenter.notFound();
    }

    const res = wallet.updateBudget(name, amount);
    await this.repository.save(wallet);
    return this.presenter.ok();
  }
}
