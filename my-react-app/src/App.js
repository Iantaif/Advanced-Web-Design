import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-head">
        <h1>Product Management App</h1>
      </header>
      <input
        type="text"
        class="searchTerm"
        placeholder="What are you looking for?"
      ></input>
      <input type="checkbox"></input>
      <div></div>
      <span class="checkmark"> Only show products in stock</span>

      <div className="App-content">
        <table>
          <div>
          <tr>
            <th>name</th>
            <th>price</th>
          </tr>
          </div>
          <div class = "frui">
          <tr>
            <th>Fruit</th>
          </tr>
          </div>
          <div>
          <tr>
            <td>Apple</td>
            <td>1$</td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          </div>
        </table>
      </div>
    </div>
  );
}

export default App;
