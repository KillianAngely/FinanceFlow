import Wallet from "../api/domain/wallet";

const forEnum = <T extends string, Res>(
  value: T,
  strats: Record<T, () => Res>
) => strats[value]();

const myWallet = new Wallet(1, "Killian", 4000, []);

forEnum(myWallet.addBudget("Food", 5000), {
  BUDGET_LIMIT_EXCEEDED: () => process.exit(1),
  OK: () => {},
});

// console.log(myWallet);
// myWallet.("Food", 5000);
// const cashspace = myWallet.showBudget();
// console.log(cashspace);

// myWallet.removeBudget('habits lol')
