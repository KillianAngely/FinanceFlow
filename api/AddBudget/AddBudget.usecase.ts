import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface IAddBudgetPresenter<OkType, NotFoundType, BudgetLimitExceededType> {
  ok(): Promise<OkType>;
  notFound(): Promise<NotFoundType>;
  budgetLimitExceeded(): Promise<BudgetLimitExceededType>;
}

export class AddBudget<OkType, NotFoundType, BudgetLimitExceededType> {
  constructor(
    private readonly presenter: IAddBudgetPresenter<
      OkType,
      NotFoundType,
      BudgetLimitExceededType
    >,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(id: number, name: string, amount: number) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return this.presenter.notFound();
    }

    const res = wallet.addBudget(name, amount);
    if (res === "BUDGET_LIMIT_EXCEEDED") {
      return this.presenter.budgetLimitExceeded();
    }

    await this.repository.save(wallet);

    return this.presenter.ok();
  }
}
