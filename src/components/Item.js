import { useState } from "react";

export default function Item({ item, onDeleteItems, onUpdateItem }) {
  const [newDescription, setNewDescription] = useState(item.description);

  // const handleSubmit = function (e) {
  //   e.preventDefault();
  //   setNewDescription(newDescription);
  // };

  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {newDescription}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>

      {/* 
      <button onClick={toggleEdit}>{ ? "🛠️" : "✅"}</button>

      {!toggleEdit && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </form>

      )}
      */}
    </li>
  );
}
