import React, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrencyRate,
  getCurrencyChange,
  setUserAmount,
  setCurrencyTo,
} from "../../store/actions/currencies";
import { Line } from "react-chartjs-2";

const Converter = () => {
  const dispatch = useDispatch();

  const currencyData = useSelector((state: any) => state.currencies);
  const [data, setData] = useState({});

  const inputChangeHandler = (event: any) => {
    dispatch(setUserAmount(event.target.value));
  };

  const currencyToChangeHandler = (event: any) => {
    dispatch(setCurrencyTo(event.target.value));
  };

  const formSubmitHandler = (event: any) => {
    event.preventDefault();
    dispatch(getCurrencyRate());
    dispatch(getCurrencyChange("2015-03-26", "2016-06-13"));
  };

  useEffect(() => {
    const updatedData = {
      labels: [...currencyData.currencyChange.labels],
      datasets: [
        {
          label: "Currency change",
          fill: true,
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: [...currencyData.currencyChange.values],
        },
      ],
    };
    setData(updatedData);
  }, [currencyData.currencyChange]);

  return (
    <div>
      <div className="form-container">
        <form action="#" onSubmit={formSubmitHandler}>
          <label htmlFor="currency-from">Enter currency in GBP: </label>
          <input
            type="number"
            name="currency-from"
            id="currency-from"
            onChange={inputChangeHandler}
            value={currencyData.amount}
            required
          />
          <br /><br/>
          <label htmlFor="currency-to">Select currency to convert into: </label>
          <select
            name="currency-to"
            id="currency-to"
            value={currencyData.currencyTo}
            onChange={currencyToChangeHandler}
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="SGD">SGD</option>
          </select>
          <br /><br/>
          <button type="submit">Convert</button>
        </form>
        <p>
          Converted amount: <strong>{currencyData.convertedAmount}</strong>
        </p>
      </div>

      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: `Change over time with respect to ${currencyData.currencyFrom}`,
            fontSize: 20,
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

export default Converter;
