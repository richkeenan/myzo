import config from "./config";

const token = config.MONZO_TOKEN;
const accountId = config.MONZO_ACCOUNT_ID;

// Hack: Don't show friend/flatmate names in screen recordings
const anonymiseCounterparty = t => {
  if (t.merchant) return t;
  if (!t.counterparty) return t;

  return {
    counterparty: {
      name: "A. Nonymous"
    },
    amount: t.amount,
    notes: "Probably rent",
    created: t.created
  };
};

const getBalance = async () => {
  const response = await fetch(
    `https://api.monzo.com/balance?account_id=${accountId}`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${token}`
      })
    }
  );

  const json = await response.json();

  json.balance = 314159; // Easter egg for demos

  return json;
};

const getTransactions = async () => {
  const response = await fetch(
    `https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}&since=2018-08-28T23:00:00Z`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${token}`
      })
    }
  );

  // Let's assume it worked for now
  const json = await response.json();

  return json.transactions.map(anonymiseCounterparty).reverse();
};

export { getTransactions, getBalance };
