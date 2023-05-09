

function Products({ sku, names, price, type, details, checked, onChange }) {
    return (
    <>
        <div className="card h190 m15 p-10">
            <input type="checkbox" checked={checked} onChange={onChange}  className="delete-checkbox top20 left20"/>   
            <h4>{sku}</h4>
            <p>{names}</p>
            <p>$ {price}</p>
            <p>{details}</p>
        </div>
    </>
    )
}


export default Products;