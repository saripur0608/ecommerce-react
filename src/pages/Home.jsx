import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import getData from '../api/api';
import MainSlider from '../components/MainSlider/MainSlider';
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
import { CartContext } from '../context/CartContext';
import { WishListContext } from '../context/WishListContext/WishListContext';
import toast, { Toaster } from 'react-hot-toast';
import Search from '../components/Search/Search';

const Home = () => {

  const { items, setItems } = useContext(CartContext);

  function saveProduct(items) {
    localStorage.setItem("items", JSON.stringify(items));
  }

  useEffect(() => {
    saveProduct((items));
  }, [items]);

  // function addToCart(product) {
  //   let listOfCart = JSON.parse(localStorage.getItem("items"));
  //   console.log(listOfCart);
  //   if (Array.isArray(listOfCart)) {
  //     listOfCart.push(product);
  //   } else {
  //     listOfCart = [product];
  //   }
  //   setItems(listOfCart);
  //   const notify = () => toast.success('Added to cart');
  //   return notify();
  // }

  function addToCart(product) {
      const index = items.find(e => e.id === product.id)  
      if (index) {
        setItems(
          items.map(e => e.id === product.id ? { 
            ...index, 
            quantity: index.quantity + 1 } 
            : e));
      } else {
        setItems([...items, { ...product, quantity: 1 }])
      }
      const notify = () => toast.success('Added to cart');
      return notify();
    }


  //fetch

  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getData();
      setStock(data);
    }
    fetch();
  }, [])

  // wishLists
  // const init=()=>{
  // return JSON.parse(localStorage.getItem("wishes"))|| [];
  // }

  // const initialState = [];
  // const [wishes, dispatch] = useReducer(wishesReducer, initialState, init);


  const { wishes, dispatch } = useContext(WishListContext);

  const handleAddWished = (product) => {

    const action = {
      type: 'add_item',
      payload: product,
    }
    dispatch(action);

    const notifyWish = () => toast('Added to wishlist',{
      icon: '❤️',
    });
    return notifyWish();
  }

  function saveWish(wishes) {
    localStorage.setItem("wishes", JSON.stringify(wishes));
  }

  useEffect(() => {
    saveWish(wishes)
  }, [wishes]);

//toggle heart
  const [iconColor,setIconColor] = useState("white");

  /////NOTAS
  // const handleRemove= (id)=>{
  //     dispatch({
  //         type: 'delete_item',
  //         payload: id,
  //     })
  // }
  //----- estaba lo de arriba en wishlist

  // const [itemWish, setItemWish] = useState({
  //     nameWish: "",
  //     idWish:""
  // });
  // const {nameWish,idWish } = itemWish;

  // const onInputChange = ({target}) => {
  //     console.log(nameWish, value);
  //     const {nameWish}= target;
  //     setItemWish({...itemWish,
  //         [nameWish]:value,
  //     })
  // };
  

  // const onSubmit =()=> {
  //     e.preventDefault();
  //     if (id=== null || name === null){
  //         return;
  //     }
  // };

  // const newItem = {
  //     idWish,
  //     nameWish,
  // };

  // setItemWish({
  //     nameWish:"",
  //     idWish: ""
  // });
  /////NOTAS

  return (
    <>
      <MainSlider />
      
      <ProductsContainer
        addToCart={addToCart}
        stock={stock}
        handleAddWished={handleAddWished}



      />
    </>
  )
}

export default Home