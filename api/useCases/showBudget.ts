import Wallet from "../domain/wallet";

class showBudget {
  constructor(private wallet: Wallet) {}

  execute() {
    this.wallet.showBudget();
  }
}

export default showBudget;
