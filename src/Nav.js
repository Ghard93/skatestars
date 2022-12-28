import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({ShowCart, cartItems, dropdown}) {

  function DisplayCart() {
    ShowCart();
  }

  function DisplayDropdown() {
    dropdown()
  }

  return (
    <div className='navBar'>
      <div className='navContainer'>
        <ul className='navBarList'>
          <Link to="/" className='navLink'>
              <li>HOME</li>
          </Link>
          <Link to="/Skateboards" className='navLink'>
              <li>SKATEBOARDS</li>
          </Link>
          <Link to="/Clothing" className='navLink'>
              <li>CLOTHING</li>
          </Link>
          <Link to="/Shoes" className='navLink'>
              <li>SHOES</li>
          </Link>
          <div className='dropdownIcon' onClick={DisplayDropdown}>
            <img src='images/HamburgerIcon.png' alt='' className='hamburgerIcon' />
          </div>
          <div className='cartNavLink'>
            <button onClick={DisplayCart} className='cartBtn'>
              <img src='images/CartIcon.png' alt='' className='cartIcon'/>
            </button>
            <p className='cartAmount'>{cartItems.length}</p>
          </div>
        </ul>
      </div>
    </div>
  )
}
