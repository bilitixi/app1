import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MenuList from "./components/MenuList";
import OrderSummary from "./components/OrderSummary";
import "./App.css";

function App() {
  const [menu, setMenu] = useState({ entrees: [], mains: [], drinks: [] });
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(() => {
    // Load from localStorage if exists
    const saved = localStorage.getItem("restaurantOrder");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch(process.env.PUBLIC_URL +"/menu.json")
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  useEffect(() => {
    // Save to localStorage every time order changes
    localStorage.setItem("restaurantOrder", JSON.stringify(order));
  }, [order]);

  const addToOrder = (item, category) => {
  setOrder(prev => [
    ...prev,
    { ...item, qty: 1, notes: "", category }
  ]);
};


  const updateQuantity = (id, qty) => {
    setOrder(prev => prev.map(o => (o.id === id ? { ...o, qty } : o)));
  };

  const updateNotes = (id, notes) => {
    setOrder(prev => prev.map(o => (o.id === id ? { ...o, notes } : o)));
  };

  const clearOrder = () => {
    setOrder([]);
    localStorage.removeItem("restaurantOrder");
  };

  return (
    <div className="app-container">
      <h1>Restaurant Order</h1>
      <SearchBar value={search} onChange={setSearch} />
      <MenuList
        menu={menu}
        search={search}
        onAdd={addToOrder}
      />
      <OrderSummary
        order={order}
        onQtyChange={updateQuantity}
        onNotesChange={updateNotes}
        onClear={clearOrder}
      />
    </div>
  );
}

export default App;
