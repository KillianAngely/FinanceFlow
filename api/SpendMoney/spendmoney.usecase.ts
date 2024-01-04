import { IWalletAggregateRepository } from "../repository/Wallet.repository.interface";

interface ISpendMoneyPresenter<OKType, InsufficientFundsType, NotFoundType> {
  ok(): Promise<OKType>;
  notFound(): Promise<NotFoundType>;
  Insufficient_funds(): Promise<InsufficientFundsType>;
}

export class SpendMoney<OKtype, InsufficientFundsType, NotFoundType> {
  constructor(
    private readonly presenter: ISpendMoneyPresenter<
      OKtype,
      NotFoundType,
      InsufficientFundsType
    >,
    private readonly repository: IWalletAggregateRepository
  ) {}

  async execute(id: number, name: string, spend: number) {
    const wallet = await this.repository.findById(id);
    if (wallet === "NOT_FOUND") {
      return this.presenter.notFound();
    }
    const res = wallet.spendMoney(name, spend);
    if (res === "INSUFFICIENT_FUNDS") {
      return this.presenter.Insufficient_funds();
    }
    await this.repository.save(wallet);

    return this.presenter.ok();
  }
}
