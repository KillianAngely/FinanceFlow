import express from "express";
import bodyParser from "body-parser";
import { CreateWallet } from "./CreateWallet/CreateWallet.usecase";
import { AddBudget } from "./AddBudget/AddBudget.usecase";
import { WalletRepository } from "./repository/Wallet.repository";
import { removeBudget } from "./RemoveBudget/RemoveBudget.usecase";
import { ShowBudget } from "./ShowBuget/ShowBudget.usecase";
import { updateBudget } from "./UpdateBuget/updateBudget.usecase";
import { SpendMoney } from "./SpendMoney/spendmoney.usecase";

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
    const wid = await new CreateWallet(
      {
        async ok() {
          res.status(200).send(JSON.stringify({ wid }));
        },
        async missingParams() {
          res.status(400);
        },
      },
      repository
    ).execute(name, limit);
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
    await new AddBudget(
      {
        async budgetLimitExceeded() {
          res.status(400);
        },
        async notFound() {
          res.status(404);
        },
        async ok() {
          res.status(200);
        },
      },
      repository
    ).execute(wid, name, amount);
  } catch (err) {
    res.status(500);
  }
});
//removebudget
app.post("/wallet/:id/removebudget", async (req, res) => {
  const wid: number = +req.params.id;
  const { name } = req.body as {
    name: string;
  };
  try {
    const uc = await new removeBudget(
      {
        async ok() {
          res.status(200);
        },
        async notFound() {
          res.status(404);
        },
      },
      repository
    ).execute(wid, name);
  } catch (err) {
    res.status(500);
    return;
  }
});
//showWallet
app.post("/wallet/:id/show", async (req, res) => {
  const wid: number = +req.params.id;
  try {
    const uc = await new ShowBudget(
      {
        async ok() {
          res.status(200).send(JSON.stringify({ uc }));
        },
        async notFound() {
          res.status(404);
        },
      },
      repository
    ).execute(wid);
  } catch (err) {
    res.status(500);
    return;
  }
});
//updateWallet
app.post("/wallet/:id/update", async (req, res) => {
  const wid: number = +req.params.id;
  const { name, amount } = req.body as {
    name: string;
    amount: number;
  };
  try {
    const uc = await new updateBudget(
      {
        async notFound() {
          res.status(404);
        },
        async ok() {
          res.status(200);
        },
      },
      repository
    ).execute(wid, name, amount);
  } catch (err) {
    res.status(500);
    return;
  }
});
//SpendMoney
app.post("/wallet/:id/spend", async (req, res) => {
  const wid: number = +req.params.id;
  const { name, spend } = req.body as {
    name: string;
    spend: number;
  };
  try {
    const uc = await new SpendMoney(
      {
        async ok() {
          res.status(200);
        },
        async Insufficient_funds() {
          res.status(503);
        },
        async notFound() {
          res.status(404);
        },
      },
      repository
    ).execute(wid, name, spend);
  } catch (err) {
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});
