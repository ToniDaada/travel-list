import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  items,
  onDeleteItems,
  onUpdateItem,
  onClearItems,
  onAddItems,
  toggleEdit,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  if (sortBy === "quantity")
    sortedItems = items.slice().sort((a, b) => b.quantity - a.quantity);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onUpdateItem={onUpdateItem}
            onAddItems={onAddItems}
          />
        ))}
      </ul>

      {sortedItems.length > 0 && (
        <div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">SORT BY INPUT ORDER</option>
            <option value="description">SORT BY DESCRIPTION</option>
            <option value="packed">SORT BY PACKED STATUS</option>
            <option value="quantity">SORT BY QUANTITY</option>
          </select>

          <button
            onClick={() => {
              onClearItems();
              setSortBy("input");
            }}
          >
            CLEAR
          </button>
        </div>
      )}
    </div>
  );
}
