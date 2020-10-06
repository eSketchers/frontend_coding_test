import { Dispatch } from "redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const SET_CONVERTED_AMOUNT = "SET_CONVERTED_AMOUNT";
export const SET_USER_AMOUNT = "SET_USER_AMOUNT";
export const SET_CURRENCY_FROM = "SET_CURRENCY_FROM";
export const SET_CURRENCY_TO = "SET_CURRENCY_TO";
export const SET_CURRENCY_CHANGE_DATA = "SET_CURRENCY_CHANGE_DATA";

export const setUserAmount = (amount: number) => {
  return { type: SET_USER_AMOUNT, amount: amount };
};

export const setCurrencyFrom = (currency: string) => {
  return { type: SET_CURRENCY_FROM, currency: currency };
};

export const setCurrencyTo = (currency: string) => {
  return { type: SET_CURRENCY_TO, currency: currency };
};

export const getCurrencyRate = () => {
  return (dispatch: Dispatch, getState: any) => {
    let state = getState().currencies;
    const url = `${BASE_URL}/latest?base=${state.currencyFrom}&symbols=${state.currencyTo}`;

    axios
      .get(url)
      .then((res: any) => {
        const rate = res.data.rates;
        const convertedAmount = rate[state.currencyTo] * state.amount;
        dispatch({
          type: SET_CONVERTED_AMOUNT,
          amount: convertedAmount.toFixed(2),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getCurrencyChange = (startDate: string, endDate: string) => {
  return (dispatch: Dispatch, getState: any) => {
    let state = getState().currencies;
    const url = `${BASE_URL}/history?base=${state.currencyFrom}&symbols=${state.currencyTo}&start_at=${startDate}&end_at=${endDate}`;

    axios
      .get(url)
      .then((res: any) => {
        const rates = res.data.rates;
        const labels: any[] = [];
        const values: any[] = [];
        Object.keys(rates).map((key) => {
          const rate = rates[key][state.currencyTo];
          labels.push(key);
          values.push(rate.toFixed(2));
          return true;
        });

        dispatch({
          type: SET_CURRENCY_CHANGE_DATA,
          data: { labels: [...labels], values: [...values] },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
