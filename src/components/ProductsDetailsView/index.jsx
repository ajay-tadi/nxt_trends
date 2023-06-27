import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header';
import './index.css'
import SimilarProductItem from '../SimilarProductItem';

function ProductDetailsView( props) {

    let { id } = useParams(); 

    const [productDetailsData, setproductDetailsData] = useState({data:{}})
    const {
        availability,
        brand,
        description,
        imageUrl,
        price,
        rating,
        title,
        totalReviews,
        similarProductsData
      } = productDetailsData.data;
      
    const getProductsDetailsView = async () =>{
        
        const token = Cookies.get('jwt_token');
        const url = `https://apis.ccbp.in/products/${id}`;
        const options = {
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        }

        const responseData = await fetch(url,options);
        
        const dataObj = await responseData.json();
        const updatedDataObj = {
            availability: dataObj.availability,
            brand: dataObj.brand,
            description: dataObj.description,
            id: dataObj.id,
            imageUrl: dataObj.image_url,
            price: dataObj.price,
            rating: dataObj.rating,
            title: dataObj.title,
            totalReviews: dataObj.total_reviews,
            similarProductsData:dataObj.similar_products
        }
        setproductDetailsData({...productDetailsData,'data':updatedDataObj})
        
    }

    useEffect(()=>{
        getProductsDetailsView()
        // eslint-disable-next-line
    },[])

    console.log(similarProductsData)
  return (
    <>
    <Header />
    <div className="product-details-success-view">
      <div className="product-details-container">
        <img src={imageUrl} alt="product" className="product-image" />
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
          <p className="product-description">{description}</p>
          <div className="label-value-container">
            <p className="label">Available:</p>
            <p className="value">{availability}</p>
          </div>
          <div className="label-value-container">
            <p className="label">Brand:</p>
            <p className="value">{brand}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              
            >
             
            </button>
            <p className="quantity">{}</p>
            <button
              type="button"
              className="quantity-controquantityller-button"
              
            >
             
            </button>
          </div>
          <button
            type="button"
            className="button add-to-cart-btn"
            
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <h1 className="similar-products-heading">Similar Products</h1>
      <ul className="similar-products-list">
        {
          similarProductsData?.map(item=>(

            <SimilarProductItem productDetails={item} key={item.key} />
          ))
          
        }
       
      </ul>
    </div>
    </>
    
    
  );

}

export default ProductDetailsView