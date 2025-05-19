import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

// export default function App() {
//   // const [item,setItem ]= useState([])

//   //^------ Can use the above too
//   const [items, setItem] = useState(initialItems);
//   function handleAddItems(item) {
//     setItem((items) => [...items, item]);
//   }

//   function handleDeleteItems(id) {
//     setItem((items) => items.filter((item) => item.id !== id));
//   }

//   return (
//     <div className="app">
//       <Logo />
//       <Form onAddItems={handleAddItems} />
//       <PackingList items={items} onDeleteItem={handleDeleteItems} />
//       <Stats />
//     </div>
//   );
// }

// function Logo() {
//   return <h1> 🌴 Far Away👜</h1>;
// }
// function Form({ onAddItems }) {
//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   /**
//    *
//    * handles the submit of the form
//    * @returns an object that renders onto the UI
//    */

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!description) return;

//     const newItemObject = {
//       description,
//       quantity,
//       packed: false,
//       id: Date.now(),
//     };

//     // console.log(newItemObject);

//     onAddItems(newItemObject);

//     setDescription("");
//     setQuantity(1);
//   }

//   return (
//     <form className="add-form" onSubmit={handleSubmit}>
//       <h3>What do you need for your 😍 trip</h3>

//       <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
//         {/**
//          * created an array with a length of 20
//          * @param _ means the current value
//          * @param i means the index. We are only interested in the index for now. index starts from zero
//          * @returns an array from 1-20 dynamically
//          */}

//         {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
//           <option value={num} key={num}>
//             {num}
//           </option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Item..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button>Add</button>
//     </form>
//   );
// }
// function PackingList({ items, onDeleteItem }) {
//   return (
//     <div className="list">
//       <ul>
//         {items.map((listItems) => {
//           return (
//             <Item
//               item={listItems}
//               key={listItems.id}
//               onDeleteItem={onDeleteItem}
//             />
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// function Item({ item, onDeleteItem }) {
//   return (
//     <li>
//       <span style={item.packed ? { textDecoration: "line-through" } : {}}>
//         {item.quantity} {item.description}
//       </span>
//       <button onClick={() => onDeleteItem(item.id)}>❌</button>
//     </li>
//   );
// }

// function Stats() {
//   return (
//     <footer className="stats">
//       👜
//       <em>You have X items on your list, and youu alreay packed X (X%)</em>
//     </footer>
//   );
// }

export default function App() {
  const [items, setItems] = useState([]);
  // Handling Adding to the list

  function showItems(item) {
    setItems([...items, item]);
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

  function handelClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to deelte all items"
    );
    confirmed && setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={showItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDelete}
        onUpdateItem={handleToggleItem}
        onClearItems={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>🌴Far Away👜</h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItemObject = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItemObject);

    console.log(newItemObject);

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

function PackingList({ items, onDeleteItems, onUpdateItem, onClearItems }) {
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

function Item({ item, onDeleteItems, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
      <button>🛠️</button>
    </li>
  );
}
function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em>Start adding items to your list 🚀</em>
      </p>
    );
  const numLength = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numLength) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `👜 You have ${numLength} items on your list, and you already packed ${numPacked} items (${percentage})% `}
      </em>
    </footer>
  );
}
