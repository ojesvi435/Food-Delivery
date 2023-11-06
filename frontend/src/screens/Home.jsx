import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useEffect, useState } from "react";

const Home = () => {
  const [foodCat,setfoodCat]=useState([]);
  const [foodItem,setfoodItem]=useState([]);
  const [search,setSearch]=useState('')
  const loadData=async()=>{ 
  let response=await fetch("http://localhost:5000/api/getItems",{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    }
});
const json=await response.json();
// console.log(json[0],json[1]);
setfoodItem(json[0])
setfoodCat(json[1])
}
useEffect(()=>{
loadData()
},[])
  
  return (
      <div>
      <div> <Navbar /> </div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain ! important"}}>
      <div className="carousel-inner" id='carousel' style={{'max-height':'500px'}}>
      <div className='carousel-caption' style={{zIndex:'10'}}>
      <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
    </div>
      </div>
        <div className="carousel-item active">
          <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{filter:'brightness(30%'}} alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900×700/?chicken" className="d-block w-100" style={{filter:'brightness(30%'}} alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{filter:'brightness(30%'}} alt="..."/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
      <div className="container">
      {foodCat && foodCat.length !== 0 ? (
        foodCat.map((data) => (
          <div key={data._id} className="row mb-3">
            <div className="fs-3 m-3">{data.CategoryName}</div>
            <hr />
            <div>
              {foodItem && foodItem.length !== 0
                ? foodItem
                    .filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItems={filterItems}
                        options={filterItems.options[0]}
                        ></Card>
                      </div>
                    ))
                : ""}
            </div>
          </div>
        ))
      ) : ""}
        </div>
      <div><Footer/></div>
      </div>
  );
};

export default Home;
