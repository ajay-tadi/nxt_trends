import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import './index.css'
import ProductCard from "../ProductCard";
import ProductsHeader from "../productsHeader";


const sortbyOptions = [
    {
      optionId: 'PRICE_HIGH',
      displayText: 'Price (High-Low)',
    },
    {
      optionId: 'PRICE_LOW',
      displayText: 'Price (Low-High)',
    },
  ]
  
const Allproducts = () =>{

  
  const [productsData,setProductsData] = useState({loader:true, data:[], activeOption:sortbyOptions[0].optionId });
  const {loader, data, activeOption} = productsData;
  console.log('main')

  useEffect(()=>{
      getProducts();
    
   },[activeOption]);

    const getProducts = async () =>{

        const token = Cookies.get("jwt_token");
        const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOption}`;

        const options = {
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(apiUrl,options);
        if (response.ok === true){
            const fetchData = await response.json();
            const updateData = fetchData.products.map(product =>({
                title: product.title,
                brand: product.brand,
                price: product.price,
                id: product.id,
                imageUrl: product.image_url,
                rating: product.rating,
              }))
            setProductsData({...productsData, loader:false,'data':updateData})
        }

    }
    
    const renderLoader =  (
        <div className="products-loader-container">
          <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    const dropdownOption =  (e) =>{
      
      setProductsData({...productsData, "activeOption":e })
      console.log(productsData) 
      
      
    }
  //   useEffect(()=>{
  //     getProducts();
     
  //  },[]);
 
    const renderProducts =  (
        <>

        <ProductsHeader sortbyOptions={sortbyOptions} activeOption={activeOption} dropdownOption={dropdownOption} />
       
        <ul className="products-list" >
          {data.map(product => (
            <ProductCard productData={product} key={product.id}/>
            
          ))}
        </ul>
      </>
      )

    return (
        <>
        {loader ? renderLoader: renderProducts }
        </>
    )



}

export default Allproducts