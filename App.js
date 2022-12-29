import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import Nav from './Nav';
import Skateboards from './Skateboards';
import Clothing from './Clothing';
import Shoes from './Shoes';
import Footer from './Footer';
import Checkout from './Checkout';

function App() {

  const [cartItems, setCartItems] = useState([])
  const [dropdownMenu, setDropdownMenu] = useState(false)

  function ShowCart() {
    document.getElementById('cartDiv').style.display = 'block'
  }

  function HideCart() {
    document.getElementById('cartDiv').style.display = 'none'
  }

  function ToggleDropdownMenu() {
    if(dropdownMenu) {
      setDropdownMenu(false)
      document.getElementById('dropdownMenu').style.display = 'none'
    }
    else {
      setDropdownMenu(true)
      document.getElementById('dropdownMenu').style.display = 'block'
    }
  }

  function AddToCart(product, price, image, quantity, size) {
    
    if(quantity === "") {
      alert("Quantity must contain a number")
      return
    }

    if(quantity.includes(".")) {
      alert("Quantity must be a whole number")
      return
    }

    if(quantity < 1) {
      alert("Quantity must be greater than 0")
      return
    }

    document.getElementById('cartDiv').style.display = 'block'
    document.getElementById('cartEmpty').style.display = 'none'
    document.getElementById('checkoutBtn').style.display = 'block'
    setCartItems(prevItems => {
      return [...prevItems, { id: crypto.randomUUID(), product: product, price: price, image: image, quantity: quantity, size: size }]
    })
  }

  function RemoveFromCart(id) {
    if(cartItems.length === 1) {
      document.getElementById('cartEmpty').style.display = 'block'
      document.getElementById('checkoutBtn').style.display = 'none'
    }
    const newCartItems = [...cartItems]
    setCartItems(newCartItems.filter(item => item.id !== id))
  }

  const cartList = cartItems.map(
    (thisProduct) => {

      if(thisProduct.size === undefined){
        return(
          <div key={thisProduct.id} className='cartItemContainer'>
            <div className='cartImgContainer'>
              <span className='imgVerticalAlign'></span>
              <img src={thisProduct.image} alt='' className='cartItemImg' />
            </div>
            <div>
              <h4 className='cartItemDetails'>{thisProduct.product}</h4>
              <p className='cartItemDetails'>Quantity: {thisProduct.quantity}</p>
              <h4 className='cartItemDetails'>${thisProduct.price * thisProduct.quantity}</h4>
            </div>
            <div className='cartImgContainer'>
              <span className='imgVerticalAlign'></span>
              <button onClick={() => RemoveFromCart(thisProduct.id)} className='cartRemoveBtn'>REMOVE</button>
            </div>            
          </div>
        )
      }

      return(
        <div key={thisProduct.id} className='cartItemContainer'>
          <div className='cartImgContainer'>
            <span className='imgVerticalAlign'></span>
            <img src={thisProduct.image} alt='' className='cartItemImg' />
          </div>
          <div>
            <h4 className='cartItemDetails'>{thisProduct.product}</h4>
            <p className='cartItemDetails'>Size: {thisProduct.size}</p>
            <p className='cartItemDetails'>Quantity: {thisProduct.quantity}</p>
            <h4 className='cartItemDetails'>${thisProduct.price * thisProduct.quantity}</h4>
          </div>
          <div className='cartImgContainer'>
            <span className='imgVerticalAlign'></span>
            <button onClick={() => RemoveFromCart(thisProduct.id)} className='cartRemoveBtn'>REMOVE</button>
          </div>
        </div>
      )
    }
  )

  return (
    <div>
      <BrowserRouter>
        <Nav ShowCart={ShowCart} cartItems={cartItems} dropdown={ToggleDropdownMenu}/>
        <div className='cartContainer'>
          <div id='cartDiv'>
            <div className='cartTopBar'>
              <h1 className='cartHeading'>SHOPPING CART</h1>
              <button onClick={HideCart} className='closeCartBtn'>X</button>
            </div>
            <div className='cartItemsArea'>
              <div id='cartEmpty'>
                <h4 className='cartItemDetails'>Cart is empty</h4>
              </div>
              {cartList}
              <div id='checkoutBtn'>
                <Link to='/Checkout'>
                  <button className='addToCartBtn'>CHECKOUT</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div id='dropdownMenu'>
          <ul className='dropdownList'>
            <Link to='/' className='dropdownLink'>
              <li onClick={ToggleDropdownMenu}>HOME</li>
            </Link>
            <Link to='/Skateboards' className='dropdownLink'>
              <li onClick={ToggleDropdownMenu}>SKATEBOARDS</li>
            </Link>
            <Link to='/Clothing' className='dropdownLink'>
              <li onClick={ToggleDropdownMenu}>CLOTHING</li>
            </Link>
            <Link to='/Shoes' className='dropdownLink'>
              <li onClick={ToggleDropdownMenu}>SHOES</li>
            </Link>
          </ul>
        </div>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Skateboards' element={<Skateboards AddToCart={AddToCart} />} />
          <Route path='/Clothing' element={<Clothing AddToCart={AddToCart} />} />
          <Route path='/Shoes' element={<Shoes AddToCart={AddToCart} />} />
          <Route path='/Checkout' element={<Checkout cart={cartItems}
           setCartItems={setCartItems} RemoveFromCart={RemoveFromCart} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
