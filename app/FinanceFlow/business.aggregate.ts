export const create = async (name: string, limit: number) => {
  const response = await fetch("http://localhost:3000/wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, limit }),
  });
  const data = await response.json();
  return data.walletId;
};

export const addBudget = async (
  walletId: number,
  name: string,
  amount: number
) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/addbudget`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    }
  );

  const data = await response.text();

  return data;
};

export const removeBudget = async (walletId: number, budgetName: string) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/removebudget`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: budgetName }),
    }
  );

  const data = await response.text();

  return data;
};

export const updateBudget = async (
  walletId: number,
  budgetName: string,
  amount: number
) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budgetName, amount }),
    }
  );
  const data = await response.text();
  return data;
};

export const dropWallet = async (walletId: number) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/drop`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.text();
  return data;
};

export const dumpWallet = async (walletId: number) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/dump`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
  const data = await response.json();
  return data;
};

export const showWallet = async (walletId: number) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/show`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.text();
  return data;
};

export const showCash = async (walletId: number) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/cashspace`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const spendMoney = async (
  walletId: number,
  name: string,
  spend: number
) => {
  const response = await fetch(
    `http://localhost:3000/wallet/${walletId}/spend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, spend }),
    }
  );
  const data = await response.text();
  return data;
};
