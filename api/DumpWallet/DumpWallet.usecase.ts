import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface IDumpWallet<OkType, NotFoundType> {
  ok(res: {
    id: number;
    name: string;
    limit: number;
    cashspace: number;
    budgets: { name: string; amount: number }[];
  }): Promise<OkType>;
  notFound(): Promise<NotFoundType>;
}

export class DumpWallet<OkType, NotFoundType> {
  constructor(
    private readonly presenter: IDumpWallet<OkType, NotFoundType>,
    private readonly repository: IWalletAggregateRepository
  ) {}
  async execute(id: number) {
    const rm = await this.repository.findReadModelById(id);
    if (rm === "NOT_FOUND") {
      return this.presenter.notFound();
    }

    return this.presenter.ok({
      id: rm.getId(),
      name: rm.getName(),
      limit: rm.getLimit(),
      cashspace: rm.budgetConsumtion(),
      budgets: rm.getBudgets(),
    });
  }
}
