import Wallet from "../../app/wallet";


class CreateWallet {
    constructor(private name : string, private  limit : number) {}

    execute() {
        const wallet = new Wallet(this.name, this.limit, []);
        return wallet;
    }
}

export default CreateWallet;