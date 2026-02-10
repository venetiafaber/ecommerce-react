import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantityInput = (event) => {
    const quantityEntered = Number(event.target.value);
    setQuantity(quantityEntered);
  };

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity,
    });
    await loadCart();
    console.log('Quantity was updated in the backend');
  };

  const updateQuantityKeyDown = (event) => {
    if (event.key === 'Enter') {
      updateQuantity();
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    } else if (event.key === 'ArrowDown' && quantity > 0) {
        setQuantity(quantity - 1);
    } else if (event.key === 'ArrowUp'&& quantity < 10) {
      setQuantity(quantity + 1);
    } 
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
            Quantity:
            {isUpdatingQuantity ? (
              <input
                type="text"
                placeholder="Enter the quantity"
                className="product-quantity-input"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={updateQuantityKeyDown}
                maxLength={10}
                minLength={1}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
