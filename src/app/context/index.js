import React from "react";
import CategoryContext from "./Category";
import ProductCartContext from "./ProductCart";
import WishlistContext from "./Wishlist";
import MakeOrderContext from "./MakeOrder";
import SearchContext from "./Search";

export const Context = ({ children }) => {
  return (
    <SearchContext>
      <CategoryContext>
        <ProductCartContext>
          <MakeOrderContext>
            <WishlistContext>{children}</WishlistContext>
          </MakeOrderContext>
        </ProductCartContext>
      </CategoryContext>
    </SearchContext>
  );
};

export default Context;
