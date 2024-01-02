import Wallet from "../domain/wallet";

class spendMoney {
  constructor(
    private wallet: Wallet,
    private name: string,
    private spend: number
  ) {}

  execute() {
    this.wallet.spendMoney(this.name, this.spend);
  }
}

export default spendMoney;
