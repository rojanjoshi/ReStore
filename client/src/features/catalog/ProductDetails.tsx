import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setproduct] = useState<Product | null>(null);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5021/api/Products/${id}`)
      .then((response) => setproduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setloading(false));
  }, [id]);

  if (loading) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found</h3>;
  return (
    <div className="row" style={{padding:'50px', paddingTop:'30px'}}>
      <div className="col-6">
        <img src={product.pictureUrl} className="img-fluid" alt="..." style={{background:'#00bfff'}}/>
      </div>
      <div className="col-6">
        <table className="table" >
          <thead>
      
            <tr>
            <th colSpan={2}>
            <h1>{product.name}</h1>
            </th>
           
              
            </tr>
            <tr>
            <th style={{borderBottom:'none'}} colSpan={2}>
            <h3 style={{color:'#00bfff'}}>NRS {product.price}</h3>
            </th>
           
              
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td >Name</td>
              <td >{product.name}</td>
            
            </tr>
            <tr>
              
              <td>Description</td>
              <td>{product.description}</td>
             
            </tr>
            <tr>
              
              <td>Type</td>
              <td>{product.type}</td>
            </tr>
            <tr>
              
              <td>Brand</td>
              <td>{product.brand}</td>
            </tr>
            <tr>
              
              <td>Quantity In Stock</td>
              <td>{product.quantityInStock}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
