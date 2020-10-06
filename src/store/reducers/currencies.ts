import {
  SET_CONVERTED_AMOUNT,
  SET_USER_AMOUNT,
  SET_CURRENCY_FROM,
  SET_CURRENCY_TO,
  SET_CURRENCY_CHANGE_DATA,
} from "../actions/currencies";

const initialState = {
  amount: 0,
  convertedAmount: 0,
  currencyFrom: "GBP",
  currencyTo: "USD",
  currencyChange: { labels: [], values: [] },
};

const CurrenciesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CONVERTED_AMOUNT:
      return { ...state, convertedAmount: action.amount };

    case SET_USER_AMOUNT:
      return { ...state, amount: action.amount };

    case SET_CURRENCY_FROM:
      return { ...state, currencyFrom: action.currency };

    case SET_CURRENCY_TO:
      return { ...state, currencyTo: action.currency };

    case SET_CURRENCY_CHANGE_DATA:
      return {
        ...state,
        currencyChange: {
          labels: action.data.labels,
          values: action.data.values,
        },
      };

    default:
      return state;
  }
};

export default CurrenciesReducer;
