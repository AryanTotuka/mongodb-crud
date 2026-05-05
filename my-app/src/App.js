import React from "react";

function App() {
  const numbers = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <h1>Map & Filter Example</h1>

      {/* map() */}
      <h2>All Numbers</h2>
      {numbers.map((num, index) => (
        <p key={index}>Number: {num}</p>
      ))}

      {/* filter() + map() */}
      <h2>Even Numbers</h2>
      {numbers
        .filter((num) => num % 2 === 0)
        .map((num, index) => (
          <p key={index}>Even: {num}</p>
        ))}
    </div>
  );
}

export default App;
