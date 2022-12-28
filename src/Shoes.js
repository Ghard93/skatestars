import React, { useState, useEffect, useRef } from 'react'

export default function Shoes({AddToCart}) {

  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const quantityRef = useRef()
  const sizeRef = useRef()

  useEffect(() => {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        setLoading(false)
        setProducts(JSON.parse(this.responseText))
        }
    });

    xhr.open("GET", "https://skateshop-fdc3.restdb.io/rest/shoes");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "638d6147f43a573dae0952fa");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
  }, [])

  const productList = products.map(
    (product) => {
        return(
            <div key={product.product} className='productListItem' onClick={() => ViewProduct(product.product)}>                
                <div className='productListImgContainer'>
                  <span className='imgVerticalAlign'></span>
                  <img src={product.image} alt="" className='productListImg' />
                </div>
                <h3 className='productListPrice'>${product.price}</h3>
                <h2 className='productListName'>{product.product}</h2>
            </div>
        )
    }
  )

  const productView = currentProduct.map(
    (product) => {
      return(
        <div key="currentProductView" className='productViewContainer'>
          <button className='filterBtn' onClick={ReturnToProdList}>Back</button>
          <div className='productViewColumns'>
            <div className='productViewImgContainer'>
              <span className='imgVerticalAlign'></span>
              <img src={product.image} className='productViewImg' alt="" />
            </div>
            <div className='productDetailsContainer'>
              <div>
                <h1 className='productHeading'>{product.product}</h1>
                <h4 className='productDetailsText'>Description:</h4>
                <p className='productDetailsText'>{product.description}</p>
              </div>
              <div>
                <h3 className='productViewPrice'>Price: ${product.price}</h3>
                <label className='productDetailsText'>Size:</label>
                <br></br>
                <select ref={sizeRef}>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </select>
                <br></br>
                <label className='productDetailsText'>Quantity:</label>
                <br></br>
                <input ref={quantityRef} type='number' min='1' defaultValue='1' />
                <br></br>
                <br></br>
                <button onClick={() => AddItemToCart(product.product, product.price, product.image)} className='addToCartBtn'>ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  )

  function ViewProduct(product) {
    document.getElementById('productList').style.display = 'none'
    setCurrentProduct(products.filter(thisproduct => thisproduct.product === product))
    document.getElementById('productView').style.display = 'block'
  }

  function ReturnToProdList() {
    setCurrentProduct([])
    document.getElementById('productView').style.display = 'none'
    document.getElementById('productList').style.display = 'block'
  }

  function AddItemToCart(product, price, image) {
    const quantity = quantityRef.current.value
    const size = sizeRef.current.value
    AddToCart(product, price, image, quantity, size)
  }

  if (loading){
    return(
      <div className='loadingImgContainer'>
        <img src='images/LoadingImage.png' alt='' className='loadingImg rotate' />
        <h1 className='loadingText'>Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <div id='productList'>
      <div className='productListContainer'>
          {productList}
        </div>
      </div>
      <div id='productView'>
        {productView}
      </div>
    </div>
  )
}
