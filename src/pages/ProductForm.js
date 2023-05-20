import React, { useState, useRef } from 'react';
import axios from 'axios';
import formValidation from "../validation/formValidation";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductForm = () => {
  const [types, setProductType] = useState("");
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [errors, setErrors] = useState({});

  let navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    formRef.current.dispatchEvent(new Event('submit'));

    const validationErrors = formValidation(types, sku, name, price, size, length, weight, width, height);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    } else {

      try {
        const response = await axios.get(`https://upright-scandiweb.000webhostapp.com/api/product/find_sku_product.php?sku=${sku}`);

        if (!response.data.isUnique) {
          setErrors({ sku: "SKU already exists" });
          return;
        }

        let Data = {
          sku: sku,
          name: name,
          price: price,
          types: types,
          size: size,
          weight: weight,
          length: length,
          width: width,
          height: height
        }

        const submitResponse = await axios.post('https://upright-scandiweb.000webhostapp.com/api/product/create_product.php', JSON.stringify(Data));

        if (submitResponse.data.status === 200) {
          navigate('/')
        } else {
          setErrors({ sku: "Error occurred while submitting product" });
        }
      } catch (error) {
        console.error(error)
      }
    }
  };

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
      <main>
        <form ref={formRef} id="product_form">

          <div className="m-b5">
            <label className="label w-120">SKU</label>
            <input id="sku" className="input w-200 p-8" type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
            <span>{errors?.sku}</span>
          </div>

          <div className="m-b5">
            <label className="label w-120">Name</label>
            <input id="name" className="input w-200 p-8" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <span>{errors?.name}</span>
          </div>

          <div className="m-b5">
            <label className="label w-120"> Price ($)</label>
            <input id="price" className="input w-200 p-8" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            <span>{errors?.price}</span>
          </div>

          <label className="label w-120">Type Switcher</label>
          <select id="productType" className="input w-200  p-8" value={types} onChange={(e) => setProductType(e.target.value)}>
            <option>Select Type</option>
            <option value="DVD">DVD</option>
            <option value="Furniture">Furniture</option>
            <option value="Book">Book</option>
          </select>
          <span>{errors?.type}</span>

          {types === 'Book' && (
            <div id="Book">
              <div className="m-b5">
                <label className="label w-120">Weight (KG)</label>
                <input id="weight" type="text" className="input w-200 p-8" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <span>{errors?.weight}</span>

              </div>
              <p className="desc m-t10 m-b10">Please provide the product weight </p>
            </div>
          )}

         {types === 'DVD' && (
            <div id="DVD">
              <div className="m-b5">
                <label className="label w-120">Size (MB)</label>
                <input id="size" type="text" className="input w-200 p-8" value={size} onChange={(e) => setSize(e.target.value)} />
                <span>{errors?.size}</span>

              </div>
              <p className="desc m-t10 m-b10">Please provide the product size </p>
            </div>
          )}

          {types === 'Furniture' && (
            <div id="Furniture">
              <div className="m-b5">
                <label className="label w-120">Height (CM)</label>
                <input id="height" type="text" className="input w-200 p-8" value={height} onChange={(e) => setHeight(e.target.value)} />
                <span>{errors?.height}</span>
              </div>

              <div className="m-b5">
                <label className="label w-120">Width (CM)</label>
                <input id="width" type="text" className="input w-200 p-8" value={width} onChange={(e) => setWidth(e.target.value)} />
                <span>{errors?.width}</span>
              </div>

              <div className="m-b5">
                <label className="label w-120"> Length (CM)</label>
                <input id="length" type="text" className="input w-200 p-8" value={length} onChange={(e) => setLength(e.target.value)} />
                <span>{errors?.length}</span>
              </div>
              <p className="desc m-t10 m-b10">*Please provide the product dimensions HxWxL</p>
            </div>
          )}

       

        </form>
      </main>
    </>

  )

}
export default ProductForm