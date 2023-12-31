import Wallet from "../../app/wallet";

class removeBudget {
  constructor(private wallet: Wallet, private name: string) {}
  execute() {
    this.wallet.removeBudget(this.name);
  }
}

export default removeBudget;
