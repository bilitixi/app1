import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MenuList from "./components/MenuList";
import OrderSummary from "./components/OrderSummary";
import "./App.css";

function App() {
  const [menu, setMenu] = useState({ entrees: [], mains: [], drinks: [] });
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(() => {
  const saved = localStorage.getItem("restaurantOrder");
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);

    // Normalize: ensure notes and orderId exist for each item
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
  const newOrderId = Date.now().toString() + Math.random().toString(36).slice(2);
  console.log("Adding item with orderId:", newOrderId);
  setOrder(prev => [
    ...prev,
    { ...item, qty: 1, notes: "", category,  orderId: newOrderId}

  ]);
};


  const updateQuantity = (orderId, qty) => {
    setOrder(prev => prev.map(o => (o.orderId === orderId ? { ...o, qty } : o)));
  };

  const updateNotes = (orderId, notes) => {
     console.log("Updating notes for orderId:", orderId, "to:", notes);
    setOrder(prev => prev.map(o => (o.orderId === orderId ? { ...o, notes } : o)));
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
