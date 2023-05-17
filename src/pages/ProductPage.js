import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Products from './Products';

const ProductPage = () => {

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Fetch the list of items from the API and update the state variable
    
    axios.get('https://upright-scandiweb.000webhostapp.com/api/product/read_product.php')
      .then(res => {
        setItems(res.data.data)

        if (res.data.message === "No Post Found") {
          setItems([]);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleCheckboxChange = (itemId) => {
    // Update the selected items state variable when a checkbox is checked or unchecked
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelectedItems = () => {
  //  Send a request to the API to delete the selected items
    axios.delete('https://upright-scandiweb.000webhostapp.com/api/product/delete_product.php', {

      data: { ids: selectedItems} 

    }).then(() => {
        // Update the state variable holding the list of items to remove the deleted itemss
        const updatedItems = items.filter(item => !selectedItems.includes(item.id));
        setItems(updatedItems);
        setSelectedItems([]);
      })
      .catch(err => console.error(err));
  };







  
  return (
    <>
      <header>
        <h3 className="header-title">Product List</h3>
        <div className="header-button">
          <button><Link to={`add_page`}>ADD</Link></button>
          <button onClick={handleDeleteSelectedItems}>MASS DELETE</button>
        </div>
      </header>
      <hr></hr>
      <div className='container'>
        {items.map((item, index) => (
          <Products
            key={index}
            {...item}
            checked={selectedItems.includes(item.id)}
            onChange={() => handleCheckboxChange(item.id)}
          />
        ))}
      </div>

    </>
  );




};

export default ProductPage;