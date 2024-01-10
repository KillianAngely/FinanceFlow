import { run } from "node:test";
import { AddBudget } from "../../api/AddBudget/AddBudget.usecase";
import { httpClient } from "../http-client/http-client";

export class AppBusinessDomain {
  async createWallet(name: string, limit: number) {
    try {
      const response = await httpClient.post("/wallet", {
        name,
        limit,
      });
      console.log(response.data);
      return response.data;
    } catch (error: string | number | any) {
      if (error.response.status === 400) {
        console.log("Invalid Request");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
    }
  }

  async addBudget(walletId: number, name: string, amount: number) {
    try {
      const response = await httpClient.post(`/wallet/${walletId}/addbudget`, {
        name,
        amount,
      });

      return response.data;
    } catch (error: string | number | any) {
      if (error.response.status === 404) {
        console.log("Not Found");
        return;
      }
      if (error.response.status === 400) {
        console.log("Budget Limit Exceeded");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
    }
  }
  //rajouter une erreur si je trouve pas le name
  async removeBudget(walletId: number, name: string) {
    try {
      const respsonse = await httpClient.post(
        `/wallet/${walletId}/removebudget`,
        {
          name,
        }
      );

      return respsonse.data;
    } catch (error: string | number | any) {
      if (error.response.status === 400) {
        console.log("Invalid Request");
        return;
      }
      if (error.response.status === 404) {
        console.log("Not Found");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
    }
  }

  async updateBuget(walletId: number, name: string, amount: number) {
    try {
      const response = await httpClient.post(`/wallet/${walletId}/update`, {
        name,
        amount,
      });
      return response.data;
    } catch (error: string | number | any) {
      if (error.response.status === 404) {
        console.log("Not Found");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
    }
  }

  async showBudget(walletId: number) {
    try {
      const response = await httpClient.get(`/wallet/${walletId}/show`);
      console.log(response.data);
      return response.data;
    } catch (error: string | number | any) {
      if (error.response.status === 400) {
        console.log("Invalid Request");
        return;
      }
      if (error.response.status === 404) {
        console.log("Not Found");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
    }
  }

  async spendMoney(walletId: number, name: string, spend: number) {
    try {
      const response = await httpClient.post(`/wallet/${walletId}/spend`, {
        name,
        spend,
      });
      return response.data;
    } catch (error: string | number | any) {
      if (error.response.status === 400) {
        console.log("Invalid Request");
        return;
      }
      if (error.response.status === 404) {
        console.log("Not Found");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
      if (error.response.status === 503) {
        console.log("Insufficient Funds");
        return;
      }
    }
  }

  async dumpWallet(walletId: number) {
    try {
      const response = await httpClient.get(`/wallet/${walletId}/dump`);
      return response.data;
    } catch (error: string | number | any) {
      if (error.response.status === 404) {
        console.log("Not Found");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
    }
  }

  async dropWallet(walletId: number) {
    try {
      const response = await httpClient.get(`/wallet/${walletId}/drop`);
      return response.data;
    } catch (error: string | number | any) {
      if (error.response.status === 404) {
        console.log("Not Found");
        return;
      }
      if (error.response.status === 500) {
        console.log("Internal Server Error");
        return;
      }
    }
  }
}

//execute

const appBusinessDomain = new AppBusinessDomain();
const res = appBusinessDomain.createWallet("My Wallet", 100).then((res) => {
  appBusinessDomain.addBudget(res.walletId, "vetements", 20);
  appBusinessDomain.addBudget(res.walletId, "nourriture", 30);
  // //remove budget
  appBusinessDomain.removeBudget(res.walletId, "vetements");
  // show budget
  appBusinessDomain.showBudget(res.walletId);
  // //update budget
  appBusinessDomain.updateBuget(res.walletId, "nourriture", 50);
  //show budget
  appBusinessDomain.showBudget(res.walletId);
  // //spend money
  appBusinessDomain.spendMoney(res.walletId, "nourriture", 20);
  //show budget
  appBusinessDomain.showBudget(res.walletId);
  // //dump wallet
  appBusinessDomain.dumpWallet(res.walletId).then((res) => {
    console.log(res);
  });
  // //drop wallet
  appBusinessDomain.dropWallet(res.walletId).then((res) => {
    console.log(res);
  });
});
