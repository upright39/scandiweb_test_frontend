import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  let navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();

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

        console.log(res.data.errors)
      }

    })
  }

  return (
    <form onSubmit={handleSubmit}>

      <div className="item">
        <label className="label">SKU</label>
        <input required name="size" type="text" value={product_details.sku} onChange={(e) => setProductDetails({ ...product_details, sku: e.target.value })} />
        {product_details.errorList.sku}
      </div>

      <div className="item">
        <label className="label">Name</label>
        <input required type="text" value={product_details.names} onChange={(e) => setProductDetails({ ...product_details, names: e.target.value })} />
        {product_details.errorList.names}
      </div>

      <div className="item">
        <label className="label"> Price ($)</label>
        <input required type="text" value={product_details.price} onChange={(e) => setProductDetails({ ...product_details, price: e.target.value })} />
        {product_details.errorList.price}
      </div>

      <label>Type Switcher</label>
      <select name="types" onChange={(e) => setProductDetails({ ...product_details, types: e.target.value })}>
        <option>Select Type</option>
        <option value="DVD">DVD</option>
        <option value="Furniture">Furniture</option>
        <option value="Book">Book</option>  
      </select>

      {/* render form fields based on the selected types */}
      {product_details.types === 'DVD' && (
        <div className="item">
          <label>Size (MB)</label>
          <input type="text" value={product_details.size} onChange={(e) => setProductDetails({ ...product_details, size: e.target.value })} />
          {product_details.errorList.size}
        </div>
      )}

      {product_details.types === 'Book' && (
        <div className="item">
          <label>Weight (KG)</label>
          <input type="text" value={product_details.weight} onChange={(e) => setProductDetails({ ...product_details, weight: e.target.value })} />
          {product_details.errorList.weight}
        </div>
      )}

      {product_details.types === 'Furniture' && (
        <>
          <div className="item">
            <label>Height (CM)</label>
            <input type="text" value={product_details.height} onChange={(e) => setProductDetails({ ...product_details, height: e.target.value })} />
            {product_details.errorList.height}
          </div>
          <div className="item">
            <label>Width (CM)</label>
            <input type="text" value={product_details.width} onChange={(e) => setProductDetails({ ...product_details, width: e.target.value })} />
            {product_details.errorList.width}
          </div>
        
          <div className="item">
            <label> Length (CM)</label>
            <input type="text" value={product_details.length} onChange={(e) => setProductDetails({ ...product_details, length: e.target.value })}/>
            {product_details.errorList.length}</div>
        </>
      )}

      <button type="submit">Submit</button>
    </form>

  );

}
export default DynamicForm;