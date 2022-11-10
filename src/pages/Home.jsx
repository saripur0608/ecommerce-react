import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import getData from '../api/api';
import MainSlider from '../components/MainSlider/MainSlider';
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
import { CartContext } from '../context/CartContext';
import { useReducer } from 'react'
import wishesReducer from '../components/WishList/actions'


const Home = () => {

  const { items, setItems } = useContext(CartContext);

  function saveProduct(items) {
    localStorage.setItem("items", JSON.stringify(items));
  }

  useEffect(() => {
    saveProduct((items));
  }, [items]);

  function addToCart(product) {
    let listOfCart = JSON.parse(localStorage.getItem("items"));
    if (Array.isArray(listOfCart)) {
      listOfCart.push(product);
    } else {
      listOfCart = [product];
    }
    setItems(listOfCart);
  }

  //fetch

  const [stock, setStock] = useState([]);

  useEffect(() => { 
    const prueba = async ()=> {
    const datos = await getData();
    setStock(datos);
    }
    prueba();
  }, [])

// wishLists

const initialState = [];
const [wishes, dispatch] = useReducer(wishesReducer, initialState);
// console.log(wishes);

const handleAddWished = (itemWished)=>{
    const action = {
        type: 'add_item',
        payload: itemWished,
    }
    dispatch(action);
}
// const handleRemove= (id)=>{
//     dispatch({
//         type: 'delete_item',
//         payload: id,
//     })
// }
//----- estaba lo de arriba en wishlist

const [itemWish, setItemWish] = useState({
    nameWish: "",
    idWish:""
});
const {nameWish,idWish } = itemWish;

// const onInputChange = ({target}) => {
//     console.log(nameWish, value);
//     const {nameWish}= target;
//     setItemWish({...itemWish,
//         [nameWish]:value,
//     })
// };
// console.log(itemWish);

// const onSubmit =()=> {
//     e.preventDefault();
//     if (id=== null || name === null){
//         return;
//     }
// };

const newItem = {
    idWish,
    nameWish,
};

setItemWish({
    nameWish:"",
    idWish: ""
});




  return (
    <>
    <MainSlider />
    <ProductsContainer
      addToCart={addToCart}
      stock={stock}
      handleAddWished= {handleAddWished}
    

    />
    </>
  )
}

export default Home