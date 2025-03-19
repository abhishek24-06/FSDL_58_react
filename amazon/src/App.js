import { useState } from "react";
import './App.css'; // Import the CSS file

// Navbar Component
function Navbar({ onSearch }) {
  return (
    <nav>
      <h1>Amazon Clone</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </nav>
  );
}

// Product Component
function Product({ product, onAddToCart }) {
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// Cart Component
function Cart({ cart }) {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : cart.map((item, index) => (
        <p key={index}>{item.name} - ${item.price}</p>
      ))}
    </div>
  );
}

// Main App Component
export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const products = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 499 },
    { name: "Headphones", price: 199 }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Navbar onSearch={setSearch} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="font-bold">Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <Product key={index} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
        <Cart cart={cart} />
      </div>
    </div>
  );
}
