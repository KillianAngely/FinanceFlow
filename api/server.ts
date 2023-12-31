import express from "express";
import bodyParser from "body-parser";
import { CreateWallet } from "./CreateWallet/CreateWallet.usecase";
import { AddBudget } from "./AddBudget/AddBudget.usecase";
import { WalletRepository } from "./repository/Wallet.repository";
import { removeBudget } from "./RemoveBudget/RemoveBudget.usecase";
import { ShowBudget } from "./ShowBuget/ShowBudget.usecase";
import { updateBudget } from "./UpdateBuget/updateBudget.usecase";
import { SpendMoney } from "./SpendMoney/spendmoney.usecase";
import { DumpWallet } from "./DumpWallet/DumpWallet.usecase";
import { DropWallet } from "./DropWallet/DropWallet.usecase";

const port = 3000;
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const repository = new WalletRepository();

// createWallet
app.post("/wallet", async (req, res) => {
  const { name, limit } = req.body as {
    name: string;
    limit: number;
  };
  if (!name || !limit) {
    return res.status(400);
  }

  try {
    await new CreateWallet(
      {
        async ok(walletId) {
          res.status(200).send(JSON.stringify({ walletId }));
        },
        async invalid() {
          res.status(400);
        },
      },
      repository
    ).execute(name, limit);
  } catch (err) {
    return res.status(500);
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
    return res.status(500);
  }
});

//removebudget
app.post("/wallet/:id/removebudget", async (req, res) => {
  const wid: number = +req.params.id;
  const { name } = req.body as {
    name: string;
  };
  if (!name) {
    return res.status(400);
  }
  try {
    await new removeBudget(
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
    return res.status(500);
  }
});

//showWallet
app.get("/wallet/:id/show", async (req, res) => {
  const wid: number = +req.params.id;
  try {
    await new ShowBudget(
      {
        async ok(walletCon) {
          res.status(200).send(JSON.stringify(walletCon));
        },
        async notFound() {
          res.status(404);
        },
      },
      repository
    ).execute(wid);
  } catch (err) {
    return res.status(500);
  }
});

//updateWallet
app.post("/wallet/:id/update", async (req, res) => {
  const wid: number = +req.params.id;
  const { name, amount } = req.body as {
    name: string;
    amount: number;
  };
  if (!name || !amount) {
    return res.status(400);
  }
  try {
    await new updateBudget(
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
    return res.status(500);
  }
});

//SpendMoney
app.post("/wallet/:id/spend", async (req, res) => {
  const wid: number = +req.params.id;
  const { name, spend } = req.body as {
    name: string;
    spend: number;
  };
  if (!name || !spend) {
    return res.status(400);
  }
  try {
    await new SpendMoney(
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
    return res.status(500);
  }
});

//Dump wallet
app.get("/wallet/:id/dump", async (req, res) => {
  const wid: number = +req.params.id;
  try {
    await new DumpWallet(
      {
        async notFound() {
          res.status(404);
        },
        async ok(wallet) {
          res.status(200).send(JSON.stringify(wallet));
        },
      },
      repository
    ).execute(wid);
  } catch (err) {
    return res.status(500);
  }
});

//Drop Wallet
app.get("/wallet/:id/drop", async (req, res) => {
  const wid: number = +req.params.id;
  try {
    await new DropWallet(
      {
        async notFound() {
          res.status(404);
        },
        async ok() {
          res.status(200);
        },
      },
      repository
    ).execute(wid);
  } catch (err) {
    return res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}/`);
});
