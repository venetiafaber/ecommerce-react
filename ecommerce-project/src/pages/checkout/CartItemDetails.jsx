import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  // let isUpdatingQuantity = true;

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  const updateCartItem = async () => {
    // isUpdatingQuantity = true;
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity
    });
    await loadCart();
    // isUpdatingQuantity = false;
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {/* {!isUpdatingQuantity && <span className="quantity-label">{cartItem.quantity}</span>} */}
            { 
              // isUpdatingQuantity && 
              <div className="product-quantity-container">
                <select
                  value={quantity}
                  onChange={selectQuantity}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateCartItem}>Update</span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >Delete</span>
        </div>
      </div>
    </>
  );
}
