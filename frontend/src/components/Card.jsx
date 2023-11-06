import React, { useEffect, useRef, useState } from 'react'
import { useCart,useDispatchCart } from './ContextReducer';

function Card(props) {
  // console.log(props)
  let dispatch=useDispatchCart()
  let data=useCart()
  let option = props.options ?? {}; 
let priceOptions = Object.keys(option);
let foodItem=props.foodItems
const priceRef=useRef()
const [qty,setqty]=useState(1)
const [size,setsize]=useState("")
const handleAddtoCart=async()=>{
  let food = []
  for (const item of data) {
    if (item.id === foodItem._id) {
      food = item;

      break;
    }
  }
  console.log(food)
  console.log(new Date())
  if (food.length!= 0) {
    if (food.size === size) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
      return
    }
    else if (food.size !== size) {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
      console.log("Size different so simply ADD one more to the list")
      return
    }
    return
  }

  await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


  // setBtnEnable(true)

}
console.log(parseInt(option[size]))
let finalPrice=qty*parseInt(option[size]) || 0;
useEffect(()=>{
  setsize(priceRef.current.value)
},[])
  return (
    <div>
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
    <img src={foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
    <div className="card-body">
      <h5 className="card-title">{foodItem.name}</h5>
      <div className="container w-100">
        <select className="m-2 h-100  bg-success rounded" onChange={(e)=>setqty(e.target.value)}>
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}
        </select>
        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setsize(e.target.value )}>
        {
          priceOptions.map((data)=>{
            return <option key={data} value={data}>{data}</option>
          })
        }
        </select>

        <div className="d-inline h-100 fs-5"> 
        ₹{finalPrice}/-
        </div>
      </div>
      <hr>
      </hr>
      <button className={`btn btn-success justify-center ms-2`} onClick={handleAddtoCart}>Add to Cart</button>
    </div>
  </div>
    </div>
  )
}

export default Card
