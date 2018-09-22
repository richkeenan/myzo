import config from "./config";

const token = config.MONZO_TOKEN;
const accountId = config.MONZO_ACCOUNT_ID;

const getTransactions = async () => {
  const response = await fetch(
    `https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}&since=2018-09-20T23:00:00Z`,
    {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${token}`
      })
    }
  );

  // Let's assume it worked for now
  const json = await response.json();

  return json;
};

export { getTransactions };
