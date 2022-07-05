import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { CartList } from "../../types/CartList";
import { ProductItem } from "../../types/ProductItem";

import "./addToCartBtn.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addNewItemToCart,
  removeFromCart,
} from "../../redux/reducers/cartSlice";

type Props = {
  id: string;
  capacity?: string;
  color?: string;
};

export const AddToCartBtn: React.FC<Props> = ({ id, color, capacity }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { products } = useAppSelector((state) => state.products);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (cart.find((cartList: CartList) => cartList.item.id === id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    if (isActive) {
      dispatch(removeFromCart(id));
      setIsActive(!isActive);
    } else {
      const card = products?.filter((item: ProductItem) => item.id === id)[0];
      const options = {
        color: !color ? '' : color
      }

      dispatch(addNewItemToCart({ count: 1, item: { ...card, ...options } }));
      setIsActive(!isActive);
    }
  };

  return (
    <button
      type="button"
      className={classNames("add-to-cart", { "add-to-cart_active": isActive })}
      onClick={() => addToCart()}
    >
      {isActive ? "Added to cart" : "Add to cart"}
    </button>
  );
};
