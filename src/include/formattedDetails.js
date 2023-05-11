


function formattedDetails(types, size, weight, length, width, height) {
    let formattedDetails = {
        DVD: `Size: ${size} MB`,
        Book: `Weight: ${weight} KG`,
        Furniture: `Dimensions: ${length} x ${width} x ${height}`
      }[types] || "" 

      return formattedDetails;
}



  export default  formattedDetails