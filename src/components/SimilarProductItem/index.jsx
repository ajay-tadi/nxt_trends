import React from 'react'
import './index.css'
function SimilarProductItem(props) {
    
    const {
        
        image_url,
        price,
        rating,
        title,
        totalReviews,
      } = props.productDetails;
     
  return (
    <div>
        <div className="similar-product-details-container">
        <img src={image_url} alt="product" className="similar-product-image" />
        <div className="product">
          <h1 className="product-name">{title}</h1>
          <p className="price-details">Rs {price}/-</p>
          <div className="rating-and-reviews-count">
            <div className="rating-container">
              <p className="rating">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="reviews-count">{totalReviews} Reviews</p>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default SimilarProductItem


