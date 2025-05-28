import { useState } from "react";
import Logo from "./Logo";
import Form from "./File";
import PackingList from "./PackingList";
import Stats from "./Stas";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  // const [edit, setEdit] = useState(false);

  // Handling Adding to the list
  function showItems(item) {
    // Guard that checks whether the user has already entered the description before
    items.map((data) => item.description === data.description).includes(true)
      ? alert(`Already contains`)
      : setItems([...items, item]);
  }
  // Handling the delete button
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Update An Array
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items"
    );
    confirmed && setItems([]);
  }

  // const toggleEdit = function () {
  //   setEdit(!edit);
  // };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={showItems} items={items} />
      <PackingList
        items={items}
        onAddItems={showItems}
        onDeleteItems={handleDelete}
        onUpdateItem={handleToggleItem}
        onClearItems={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
