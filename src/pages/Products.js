
function Products({ sku, name, price, details, checked, onChange }) {
    return (
        <>
            <div className="card h190 m15 p-10">
                <input className="top20 left20 delete-checkbox" type="checkbox" checked={checked} onChange={onChange}  />
                <p className="uppercase">{sku}</p>
                <p>{name}</p>
                <p>{price} $</p>
                <p>{details}</p>
            </div>
        </>
    )
}

export default Products;