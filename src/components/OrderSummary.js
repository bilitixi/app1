import React from "react";

export default function OrderSummary({ order, onQtyChange, onNotesChange, onClear }) {
  const total = order.reduce((sum, item) => sum + item.price * item.qty, 0);

  const renderCategory = (category) => {
    const categoryItems = order.filter(o => o.category === category);
    if (categoryItems.length === 0) return null;

    return (
      <>
        <h3>{category}</h3>
        {categoryItems.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.name}</span>
            <input
              type="number"
              value={item.qty}
              min="1"
              onChange={(e) => onQtyChange(item.id, parseInt(e.target.value))}
              style={{ width: "50px" }}
            />
            <input
              type="text"
              placeholder="Notes"
              value={item.notes}
              onChange={(e) => onNotesChange(item.id, e.target.value)}
              style={{ marginLeft: "8px", flex: 1 }}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {order.length === 0 ? (
        <p>No items in order.</p>
      ) : (
        <>
          {renderCategory("Entrée")}
          {renderCategory("Main")}
          {renderCategory("Drink")}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={onClear}>Clear Order</button>
        </>
      )}
    </div>
  );
}
