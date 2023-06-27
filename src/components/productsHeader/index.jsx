import React from 'react'
import './index.css'

function ProductsHeader(props) {
  const {sortbyOptions,activeOption,dropdownOption} = props
  
  const dropdownChangeFunc = (e) =>{
    dropdownOption(e.target.value);
  }

  return (
    <div className='products-header'>
      <h1 className="products-list-heading">All Products</h1>
        <select className="dropdown" onChange={dropdownChangeFunc} >
            {sortbyOptions.map(item=>(
              <option value={item.optionId} defaultValue={activeOption} >{item.displayText}</option>
            ))}
        </select>
    </div>
  )
}

export default ProductsHeader



