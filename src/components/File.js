import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim("")) return;

    const newItemObject = {
      description: description.trim(""),
      quantity,
      packed: false,
      id: Date.now(),
      edit: false,
    };

    // Guard that checks whether the user has already entered the description before
    // items
    //   .map((item) => item.description === newItemObject.description)
    //   .includes(true)
    //   ? alert("Already contains")
    //   : onAddItems(newItemObject);
    // console.log(newItemObject);
    onAddItems(newItemObject);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add Items</button>
    </form>
  );
}
