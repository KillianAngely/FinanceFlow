import express from "express";
import bodyParser from "body-parser";
import { CreateWallet } from "./CreateWallet/CreateWallet.usecase";
import { AddBudget } from "./AddBudget/AddBudget.usecase";
import { WalletRepository } from "./repository/Wallet.repository";

const port = 3000;
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const repository = new WalletRepository();

// createWallet
app.post("/wallet", async (req, res) => {
  const { name, limit } = req.body;
  if (!name || !limit) {
    res.status(400);
    return;
  }

  try {
    const wid = await new CreateWallet(repository).execute(name, limit);
    res.status(200).send(JSON.stringify({ wid }));
    return;
  } catch (err) {
    res.status(500);
    return;
  }
});
//addbudget
app.post("/wallet/:id/addbudget", async (req, res) => {
  const wid: number = +req.params.id;
  const { name, amount } = req.body as {
    name: string;
    amount: number;
  };
  try {
    const uc = await new AddBudget(repository).execute(wid, name, amount);
    res.status(200);
    return;
  } catch (err) {
    res.status(500);
    return;
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});
