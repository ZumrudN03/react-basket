import React, { useEffect, useState } from "react";
import "./index.css";

function Market() {
  const [fetchData, setFetchData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    getFetch();
  }, []);

  async function getFetch() {
    const data = await fetch("https://northwind.vercel.app/api/products");
    const res = await data.json();
    setFetchData(res);
  }

  function addBasket(newItem) {
    if (!basket.find((x) => x.id === newItem.id)) {
      newItem.count = 1;
      setBasket([...basket, newItem]);
    } else {
      setBasket(
        basket.map((x) => {
          if (x.id === newItem.id) x.count++;
          return x;
        })
      );
    }
  }

  function removeBasket(newItem) {
    if (newItem.count > 1) {
      newItem.count--;
      setBasket(
        basket.map((x) => {
          if (x.id === newItem.id) return newItem;
          else return x;
        })
      );
    }
  }

  function allRemoveBasket(newItem) {
    setBasket(basket.filter((x) => x !== newItem));
  }

  return (
    <div className="container">
      <div className="basket">
        <h1>BASKET</h1>
        <ul className="basketwrapper">
          {basket.map((x) => {
            return (
              <ul className="card" key={x.id}>
                <img
                  src="https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg?w=1380&t=st=1701224768~exp=1701225368~hmac=65972f2cda32454a375bdfffb755acde8903716714bde1c54b5a5c9900a69205"
                  alt=""
                />
                <div className="basketList">
                  <li>{x.id}</li>
                  <li>{x.name}</li>
                </div>
                <div className="addRemoveBtns">
                  <button onClick={() => removeBasket(x)}>-</button>
                  <span>{x.count}</span>
                  <button onClick={() => addBasket(x)}>+</button>
                </div>
                <button onClick={() => allRemoveBasket(x)}>Delete Item</button>
              </ul>
            );
          })}
        </ul>
      </div>
      <div className="market">
        <ul className="marketwrapper">
          {fetchData.map((x) => {
            return (
              <ul className="card" key={x.id}>
                <img
                  src="https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg?w=1380&t=st=1701224768~exp=1701225368~hmac=65972f2cda32454a375bdfffb755acde8903716714bde1c54b5a5c9900a69205"
                  alt=""
                />
                <div className="basketList">
                  <li>{x.id}</li>
                  <li>{x.name}</li>
                </div>
                <button onClick={() => addBasket(x)}>add</button>
              </ul>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Market;
