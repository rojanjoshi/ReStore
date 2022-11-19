import { useEffect, useState } from "react";

import { Product } from "../../app/models/product";



export default function HomePage() {
    const [products, setproducts] = useState<Product[]>([]);
    useEffect(()=>{
      fetch('http://localhost:5021/api/products')
      .then(response=>response.json())
      .then(data=>setproducts(data))
    },[])
  return (
    
    <>
    <div className="row">
    {products.map((product) => (
          <div className="col-3 mt-2" key={product.id} >
          
          <div className="card" style={{width:'18rem',height:'310px'}}>
          <div className="card-body">
    <h5 className="card-title" style={{height:'25px'}}>{product.name}</h5>
   
  </div>
  <img src={product.pictureUrl} className="card-img-top" alt="..." style={{height:'100px',objectFit:'contain',background:'#00bfff',borderRadius:'0px'}}/>
  <div className="card-body">
    
    <p className="card-text">{product.brand} / {product.type}</p>
    <p className="card-text">NPR {product.price/100}</p>
    
    <a href="#" className="" style={{textDecoration:'none'}}>Add to cart</a>
    <a href={`/catalog/${product.id}`}className="" style={{paddingLeft:'20px',textDecoration:'none'}}>View</a>
    
 
  </div>

</div>
          </div>
      
      ))}
     
      
    

    </div>
    
      
      

      
      
    </>
  )
}
