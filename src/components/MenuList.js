import React from "react";

export default function MenuList({ menu, search, onAdd }) {
  const filterItems = (items) =>
    items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h2>Entrées</h2>
      {filterItems(menu.entrees).map(item => (
        <div key={item.id} className="menu-item">
          <span>{item.name} - ${item.price.toFixed(2)}</span>
          <button onClick={() => onAdd(item, "Entrée")}>Add</button>
        </div>
      ))}

      <h2>Main Plates</h2>
      {filterItems(menu.mains).map(item => (
        <div key={item.id} className="menu-item">
          <span>{item.name} - ${item.price.toFixed(2)}</span>
          <button onClick={() => onAdd(item, "Main")}>Add</button>
        </div>
      ))}

      <h2>Drinks</h2>
      {filterItems(menu.drinks).map(item => (
        <div key={item.id} className="menu-item">
          <span>{item.name} - ${item.price.toFixed(2)}</span>
          <button onClick={() => onAdd(item, "Drink")}>Add</button>
        </div>
      ))}
      <h2>Add-More</h2>
      {filterItems(menu.Add_More).map(item => (
        <div key={item.id} className="menu-item">
          <span>{item.name} - ${item.price.toFixed(2)}</span>
          <button onClick={() => onAdd(item, "Add_More")}>Add</button>
        </div>
      ))}




    </div>
  );
}
