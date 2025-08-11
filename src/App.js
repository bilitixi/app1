import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MenuList from "./components/MenuList";
import OrderSummary from "./components/OrderSummary";
import "./App.css";

function App() {
  const [menu, setMenu] = useState({ entrees: [], mains: [], drinks: [], Add_More: [] });
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(() => {
    const saved = localStorage.getItem("restaurantOrder");
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return parsed.map(item => ({
        ...item,
        notes: item.notes || "",
        orderId: item.orderId || (Date.now().toString() + Math.random().toString(36).slice(2))
      }));
    } catch (error) {
      console.error("Failed to parse saved order from localStorage:", error);
      return [];
    }
  });

  // New state: selected menu source filename
  const [menuSource, setMenuSource] = useState("Lunch.json");

  // Fetch menu whenever menuSource changes
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/" + menuSource)
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => {
        console.error("Failed to load menu:", err);
        setMenu({ entrees: [], mains: [], drinks: [] }); // fallback empty
      });
  }, [menuSource]);

  useEffect(() => {
    localStorage.setItem("restaurantOrder", JSON.stringify(order));
  }, [order]);

  const addToOrder = (item, category) => {
    const newOrderId = Date.now().toString() + Math.random().toString(36).slice(2);
    setOrder(prev => [
      ...prev,
      { ...item, qty: 1, notes: "", category, orderId: newOrderId }
    ]);
  };

  const updateQuantity = (orderId, qty) => {
    setOrder(prev => prev.map(o => (o.orderId === orderId ? { ...o, qty } : o)));
  };

  const updateNotes = (orderId, notes) => {
    setOrder(prev => prev.map(o => (o.orderId === orderId ? { ...o, notes } : o)));
  };

  const clearOrder = () => {
    setOrder([]);
    localStorage.removeItem("restaurantOrder");
  };

  return (
    <div className="app-container">
      <h1>Restaurant Order</h1>

      {/* New menu selector */}
      <label htmlFor="menuSelect">Select Menu: </label>
      <select
        id="menuSelect"
        value={menuSource}
        onChange={e => setMenuSource(e.target.value)}
      >
        <option value="Lunch.json">Lunch Menu</option>
        <option value="Dinner.json">Dinner Menu</option>
        
        {/* Add more options as needed */}
      </select>

      <SearchBar value={search} onChange={setSearch} />
      <MenuList menu={menu} search={search} onAdd={addToOrder} />
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
