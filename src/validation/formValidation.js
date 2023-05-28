const formValidation = (productType, sku, names, price, size, length, weight, width, height) => {
  const errors = {};

  if (!sku) {
    errors.sku = "SKU is required";
  }

  if (!names) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(names)) {
    errors.name = "Name must only contain letters and spaces";
  }

  if (!price) {
    errors.price = "Price is required.";
  } else if (isNaN(price)) {
    errors.price = "Price must be a valid number.";
  }

  if (!productType) {
    errors.type = "product type is required";
  }

  if (productType === "DVD") {
    if (!size) {
      errors.size = "Size is required";
    } else if (isNaN(size)) {
      errors.size = "height must be a valid number"
    }
  }

  if (productType === "Furniture") {
    if (!height) {
      errors.height = "height is required";
    } else if (isNaN(height)) {
      errors.height = "height must be a valid number.";
    }

    if (!width) {
      errors.width = "width is required";
    } else if (isNaN(width)) {
      errors.width = "width must be a valid number.";
    }

    if (!length) {
      errors.length = "length is required";
    } else if (isNaN(length)) {
      errors.length = "length must be a valid number.";
    }
  }

  if (productType === "Book") {

    if (!weight) {
      errors.weight = "weight is required";
    } else if (isNaN(weight)) {
      errors.weight = "weight must be a valid number";
    }
  }

  return errors;
};

export default formValidation;
