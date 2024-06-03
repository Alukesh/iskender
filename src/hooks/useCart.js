import { useState } from "react";
import { useDispatch } from "react-redux";

const useCart = (product, previousAddedNum = 0, complectsCheck, setComplectsCheck) => {
  const [countCart, setCountCart] = useState(0);
  const [isAdded, setAdded] = useState(false);
  const [isLimited, setLimited] = useState(false)
  const [prompt, setPrompt] = useState("Нажмите чтобы добавить товар в корзину")
  const dispatch = useDispatch();

  const AddToBasket = (e) => {
    e.preventDefault();

    if (countCart + previousAddedNum < product.quantity) {
      setCountCart(countCart + 1)
    }
    else {
      setPrompt("Дошло до лимита на складе")
    }
  };

  const RemoveFromBasket = (e) => {
    e.preventDefault();

    if (countCart > 0) {
      setCountCart(countCart - 1)
      setPrompt("Нажмите чтобы добавить товар в корзину")
    }
  };
  const handleAddNow = (e) => {
    if (countCart + previousAddedNum < product.quantity) {
      setAdded(true)
      setCountCart(countCart + 1)
      dispatch.cart.addToCart({
        product,
        count: countCart + 1
      })
      setCountCart(0)

      setTimeout(() => {
        setAdded(false)
      }, 2000)
    }
    else {
      setPrompt("Дошло до лимита на складе")
    }
  }
  const handleRemoveNow = (e) => {
    if (previousAddedNum > 1) {
      dispatch.cart.decrement({
        product
      })
    } else {
      dispatch.cart.removeFromCart({
        product
      })
    }    
    setPrompt("Нажмите чтобы добавить товар в корзину")
  }

  const handleContextMenu = (e) => {
    e.preventDefault()

    if (countCart > 0) {
      setAdded(true)

      dispatch.cart.addToCart({
        product,
        count: countCart
      })
      setCountCart(0)

      if (complectsCheck) {
        complectsCheck.map(el => {
          dispatch.cart.addToCart({
            product: el,
            count: 1
          })
        })
        setComplectsCheck([])
      }

      setTimeout(() => {
        setAdded(false)
      }, 2000)
    }
  }

  const preventConextMenu = (e) => {
    e.preventDefault()
  }

  return {
    preventConextMenu,
    handleContextMenu,
    RemoveFromBasket,
    AddToBasket,
    handleAddNow,
    handleRemoveNow,
    isAdded,
    prompt,
    isLimited,
    countCart
  }
}

export default useCart;