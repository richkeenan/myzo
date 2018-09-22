import config from "./config";

const token = config.MONZO_TOKEN;
const accountId = config.MONZO_ACCOUNT_ID;

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

  // Todo remove filter to add rent payment back in
  return (
    json.transactions
      // .filter(x => x.amount < 800)
      .reverse()
  );
};

export { getTransactions, getBalance };
