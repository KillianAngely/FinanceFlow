import Wallet from "../domain/wallet";

class updateBudget {
  constructor(
    private wallet: Wallet,
    private name: string,
    private amount: number
  ) {}

  execute() {
    this.wallet.updateBudget(this.name, this.amount);
  }
}

export default updateBudget;
