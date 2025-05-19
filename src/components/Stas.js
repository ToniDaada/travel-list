export default function Stats({ items }) {
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
