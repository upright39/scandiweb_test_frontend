const formValidation = (types, sku, names, price, size,length,weight,width,height) => {
    const errors = {};
  
    if (!sku) {
      errors.sku = "SKU is required";
    }
  
    if (!names) {
      errors.names = "Name is required";
    }
  
    if (!price) {
      errors.price = "Price is required";
    }
    if (!types) {
        errors.type = "product type is required";
      }


     if (types === "DVD") {
      if(!size){
        errors.size = "Size is required";
      }    
    }
  
    if (types === "Furniture") {
      if (!height) {
        errors.height = "height is required";
      }
  
      if (!width) {
        errors.width = "width is required";
      }
      if (!length) {
        errors.length = "length is required";
      }
    }

     if (types === "Book") {

        if(!weight){
            errors.weight = "weight is required";
        }
       
      }
  
    return errors;
  };
  
  export default formValidation;
  