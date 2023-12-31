import Wallet from "../../app/wallet";

class addBudget {
  constructor(
    private wallet: Wallet,
    private name: string,
    private amount: number
  ) {}

  execute() {
    this.wallet.addBudget(this.name, this.amount);
  }
}

export default addBudget;
