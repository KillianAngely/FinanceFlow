import Wallet from "../domain/wallet";

class removeBudget {
  constructor(private wallet: Wallet, private name: string) {}
  execute() {
    this.wallet.removeBudget(this.name);
  }
}

export default removeBudget;
