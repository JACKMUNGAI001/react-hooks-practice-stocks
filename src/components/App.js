import React, { useState, useEffect } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(response => response.json())
      .then(data => setStocks(data));
  }, []);

  const buyStock = (stock) => {
    if (!portfolio.find(portfolioStock => portfolioStock.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const sellStock = (stock) => {
    setPortfolio(portfolio.filter(portfolioStock => portfolioStock.id !== stock.id));
  };

  const getFilteredAndSortedStocks = () => {
    let filteredStocks = filterBy === "All" ? stocks : stocks.filter(stock => stock.type === filterBy);
    
    if (sortBy === "Alphabetically") {
      return filteredStocks.sort((a, b) => a.ticker.localeCompare(b.ticker));
    } else if (sortBy === "Price") {
      return filteredStocks.sort((a, b) => a.price - b.price);
    }
    
    return filteredStocks;
  };

  return (
    <div>
      <Header />
      <MainContainer
        stocks={getFilteredAndSortedStocks()}
        portfolio={portfolio}
        onBuyStock={buyStock}
        onSellStock={sellStock}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
    </div>
  );
}

export default App;
