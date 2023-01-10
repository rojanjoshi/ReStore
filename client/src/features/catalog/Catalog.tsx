
import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";






export default function Catalog() {
  const [products, setproducts] = useState<Product[]>([]);
  useEffect(()=>{
    fetch('http://localhost:5021/products')
    .then(response=>response.json())
    .then(data=>setproducts(data))
  },[])
  
  return (
    
   
      <ProductList products={products}/>
    
      
      
    
  );
}
