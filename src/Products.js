

function Products({ sku, names, price, type, details, checked, onChange }) {
    return (
    <>
        <div className="card">
            <input type="checkbox" checked={checked} onChange={onChange}  className="delete-checkbox"/>   
            <h4>{sku}</h4>
            <p>{names}</p>
            <p>$ {price}</p>
            <p>{details}</p>
        </div>
    </>
    )
}


export default Products;