import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function DynamicForm() {
  const [product_details, setProductDetails] = useState({
    sku: "",
    names: "",
    price: "",
    types: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
    errorList: []
  });
  const formRef = useRef(null);
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.dispatchEvent(new Event('submit'));
    const formData = {
      sku: product_details.sku,
      names: product_details.names,
      price: product_details.price,
      types: product_details.types,
      size: product_details.size,
      weight: product_details.weight,
      height: product_details.height,
      width: product_details.width,
      length: product_details.length,

    }
    axios.post('http://localhost/test-scandiweb/api/product/create_product.php', formData).then((res) => {

      if (res.data.status === 200) {
        navigate("/");
      } else {
        setProductDetails({ ...product_details, errorList: res.data.errors })
      }

    })
  }

  return (
    <>
       <header>
        <h3 className="header-title">Product List</h3>
         <div className="header-button"> 
         <button type="submit" onClick={handleSubmit}>Save</button> 
         <button><Link to={`/`}>Cancel</Link></button>
         </div>
      </header>
      <hr></hr>
      <div id="product-form">
      <form ref={formRef}>

        <div className="item">
          <label className="label">SKU</label>
          <input required className="input" type="text" value={product_details.sku} onChange={(e) => setProductDetails({ ...product_details, sku: e.target.value })} />
          <span>{product_details.errorList.sku}</span> 
        </div>

        <div className="item">
          <label className="label">Name</label>
          <input required className="input" type="text" value={product_details.names} onChange={(e) => setProductDetails({ ...product_details, names: e.target.value })} />
          <span>{product_details.errorList.names}</span> 
          
        </div>

        <div className="item">
          <label className="label"> Price ($)</label>
          <input required className="input" type="text" value={product_details.price} onChange={(e) => setProductDetails({ ...product_details, price: e.target.value })} />
          <span>{product_details.errorList.price}</span> 
        </div>

        <label className="label">Type Switcher</label>
        <select className="input" id="productType" onChange={(e) => setProductDetails({ ...product_details, types: e.target.value })}>
          <option>Select Type</option>
          <option value="DVD">DVD</option>
          <option value="Furniture">Furniture</option>
          <option value="Book">Book</option>
        </select>

        {/* render form fields based on the selected types */}
        {product_details.types === 'DVD' && (
          <div id="DVD">
            <div className="item">
            <label className="label">Size (MB)</label>
            <input type="text" className="input" value={product_details.size} onChange={(e) => setProductDetails({ ...product_details, size: e.target.value })} />
            <span>{product_details.errorList.size}</span> 
          
          </div>
          <p className="desc">Please provide the product size </p>
          </div>
        )}

        {product_details.types === 'Book' && (
          <div id="Book">
           <div className="item">
            <label className="label">Weight (KG)</label>
            <input type="text" className="input" value={product_details.weight} onChange={(e) => setProductDetails({ ...product_details, weight: e.target.value })} />
            <span>{product_details.errorList.weight}</span> 
            
          </div>
          <p className="desc">Please provide the product weight </p>
          </div>
        
        )}

        {product_details.types === 'Furniture' && (
          <div id="Furniture">
            <div className="item">
              <label className="label">Height (CM)</label>
              <input type="text" className="input" value={product_details.height} onChange={(e) => setProductDetails({ ...product_details, height: e.target.value })} />
              <span>{product_details.errorList.height}</span> 
              
            </div>
            <div className="item">
              <label className="label">Width (CM)</label>
              <input type="text" className="input" value={product_details.width} onChange={(e) => setProductDetails({ ...product_details, width: e.target.value })} />
              <span>{product_details.errorList.width}</span> 
            </div>

            <div className="item">
              <label className="label"> Length (CM)</label>
              <input type="text" className="input" value={product_details.length} onChange={(e) => setProductDetails({ ...product_details, length: e.target.value })} />
              <span>{product_details.errorList.length}</span> 
              </div>
              <p className="desc">*Please provide the product dimensions HxWxL</p>
          </div>
        )}


      </form>
      </div>
    </>

  );

}
export default DynamicForm;