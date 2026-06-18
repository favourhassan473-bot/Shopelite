import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shopelite_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("shopelite_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (product, quantity = 1, size = "", color = "") => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          item.size === size &&
          item.color === color,
      );
      if (existing) {
        return prev.map((item) =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity, size, color }];
    });
  };

  const removeFromCart = (id, size = "", color = "") => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item._id === id && item.size === size && item.color === color),
      ),
    );
  };

  const updateQuantity = (id, quantity, size = "", color = "") => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("shopelite_cart");
    } catch (e) {}
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
