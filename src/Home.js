import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div className='frontPageBackground'>
        <img src='images/SkateStarsTitle.png' className='titleImg' alt=''/>
        <h2 className='tagline'>Premium - Skateboard - Supplier</h2>
      </div>
      <div className='productLinksContainer'>
        <Link to="/Clothing" className='productLinkStyle'>
          <div className='clothingProductLink'>
            <div className='linkImgContainer'>
              <img src='images/thrasherhood.png' className='thrasherhoodImg' alt='' />            
            </div>
            <h1 className='frontPageLinkText clothingLink'>CLOTHING</h1>
          </div>          
        </Link>
        <Link to="/Skateboards" className='productLinkStyle'>
          <div className='skateProductLink'>
            <div className='linkImgContainer'>
              <img src='images/grip.png' className='gripImg' alt=''/>
            </div>
            <h1 className='frontPageLinkText skateboardLink'>SKATEBOARDS</h1>
          </div>
        </Link>
        <Link to="/Shoes" className='productLinkStyle'>
          <div className='shoeProductLink'>
            <div className='linkImgContainer'>
              <img src='images/DCShoeBlack.png' className='dcBlack' alt=''/>
            </div>
            <h1 className='frontPageLinkText shoesLink'>SHOES</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}
