const API_URL = "http://localhost:3000";

export const create = async (name: string, limit: number) => {
  const response = await fetch(`${API_URL}/wallet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, limit }),
  });
  const data = await response.json();
  return data as number;
};

export const addBudget = async (
  walletId: number,
  name: string,
  amount: number
) => {
  const response = await fetch(`${API_URL}/wallet/${walletId}/addbudget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, amount }),
  });
};

export const removeBudget = async (walletId: number, budgetName: string) => {
  const response = await fetch(`${API_URL}/wallet/${walletId}/removebudget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: budgetName }),
  });
};

export const updateBudget = async (
  walletId: number,
  budgetName: string,
  amount: number
) => {
  await fetch(`${API_URL}/wallet/${walletId}/updatebudget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ budgetName, amount }),
  });
};

export const dropWallet = async (walletId: number) => {
  await fetch(`${API_URL}/wallet/${walletId}/drop`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const refreshWallet = async (walletId: number) => {
  const response = await fetch(`${API_URL}/wallet/${walletId}/dump`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const data = await response.json();
  return data;
};

export const showCash = async (walletId: number) => {
  const response = await fetch(`${API_URL}/wallet/${walletId}/cashspace`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const spendMoney = async (
  walletId: number,
  name: string,
  spend: number
) => {
  const response = await fetch(`${API_URL}/wallet/${walletId}/spend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, spend }),
  });
  const data = await response.json();
  return data;
};
