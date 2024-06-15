import React, { createContext, useContext, useState } from "react";
export const ProductCartContext = createContext();
export const ProductCartCont = () => useContext(ProductCartContext);

const ProductCartItem = ({ children }) => {
  const [addToCart, setAddToCart] = useState(null);

  return (
    <ProductCartContext.Provider value={[addToCart, setAddToCart]}>
      {children}
    </ProductCartContext.Provider>
  );
};
export default ProductCartItem;
