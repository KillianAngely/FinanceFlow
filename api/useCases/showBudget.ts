import Wallet from "../../app/wallet";

class showBudget {
  constructor(
    private wallet: Wallet,
  ) {}

  execute() {
    this.wallet.showBudget();
  }
}

export default showBudget;
