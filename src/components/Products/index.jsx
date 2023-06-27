import Allproducts from '../Allproducts'
import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="products-container">
      <Allproducts />
    </div>
  </>
)

export default Products