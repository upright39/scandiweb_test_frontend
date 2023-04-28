import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductPage = () => {

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    // Fetch the list of items from the API and update the state variable
    axios.get('http://localhost/test-scandiweb/api/product/read_product.php')
      .then(res =>{ setItems(res.data.data)

        if(res.data.message === "No Post Found"){
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
    // Send a request to the API to delete the selected items
    axios.delete('http://localhost/test-scandiweb/api/product/delete_product.php', {
      data: { ids: selectedItems }
    })
      .then(() => {
        // Update the state variable holding the list of items to remove the deleted items
        const updatedItems = items.filter(item => !selectedItems.includes(item.id));
        setItems(updatedItems);
        setSelectedItems([]);
      })
      .catch(err => console.log(err));
  };
  return (
    <div>  
      
      <Link to={`add_page`}>ADD</Link>
      <button onClick={handleDeleteSelectedItems}>MASS DELETE</button>
        {items.map(item => (
          <div key={item.id}>
            <label>
              <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
              {item.sku}
               {item.names}
               {item.price}
               {item.type}
               {item.details}
            </label>
          </div>
        ))}
      
    </div>
  );
};

export default ProductPage;