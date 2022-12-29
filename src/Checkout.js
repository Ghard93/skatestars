import React, { useState, useRef, useEffect } from 'react'

export default function Checkout({cart, setCartItems, RemoveFromCart}) {

  const [contactDetails, setContactDetails] = useState([])
  const [deliveryDetails, setDeliveryDetails] = useState([])
  const [checkoutItems, setCheckoutItems] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const [paymentAmount, setPaymentAmount] = useState()
  const [gst, setGst] = useState()
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paid, setPaid] = useState(false)
  const firstName = useRef()
  const lastName = useRef()
  const contactNum = useRef()
  const emailAddress = useRef()
  const delivNum = useRef()
  const delivStreet = useRef()
  const delivSuburb = useRef()
  const delivCity = useRef()
  const delivPostcode = useRef()

  useEffect(() => {
    document.getElementById('cartDiv').style.display = 'none'
  }, [])

  useEffect(() => {
    let newTotal = 0

    for(let i = 0; i < cart.length; i++) {
        newTotal += cart[i].price * cart[i].quantity
    }

    setTotalPrice(newTotal)
  }, [cart])

  function RemoveCartItem(id) {
    RemoveFromCart(id)
  }

  function ConfirmPayment() {

    if(cart.length < 1) {
      alert("You must have at least one item in your cart to make a purchase")
      return
    }

    const fName = firstName.current.value
    const lName = lastName.current.value
    const contactNumber = contactNum.current.value
    const email = emailAddress.current.value
    const streetNumber = delivNum.current.value
    const streetName = delivStreet.current.value
    const suburb = delivSuburb.current.value
    const city = delivCity.current.value
    const postcode = delivPostcode.current.value

    setContactDetails([{ firstName: fName, lastName: lName, phone: contactNumber, email: email }])
    setDeliveryDetails([{ number: streetNumber, street: streetName, suburb: suburb, city: city, postcode: postcode }])
    setCheckoutItems([...cart])
    setPaymentAmount(totalPrice)
    setGst(totalPrice * 0.15)
    setCartItems([])
    document.getElementById('cartEmpty').style.display = 'block'
    document.getElementById('checkoutBtn').style.display = 'none'
    setProcessingPayment(true)
    setTimeout(DisplayReceipt, 3000)
  }

  function DisplayReceipt() {
    setProcessingPayment(false)
    setPaid(true)
  }

  const cartList = cart.map(
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
              <button onClick={() => RemoveCartItem(thisProduct.id)} className='cartRemoveBtn'>REMOVE</button>
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
            <button onClick={() => RemoveCartItem(thisProduct.id)} className='cartRemoveBtn'>REMOVE</button>
          </div>
        </div>
      )
    }
  )

  const contactInfo = contactDetails.map(
    (contact) => {
      return(
        <div key='contactInfo'>
          <h4 className='cartItemDetails'>A receipt has been sent to: {contact.email}</h4>
          <p>Name: {contact.firstName} {contact.lastName}</p>
          <p>Contact Number: {contact.phone}</p>
        </div>
      )
    }
  )

  const deliveryInfo = deliveryDetails.map(
    (delivery) => {
      return(
        <div key='delivInfo'>
          <h4 className='cartItemDetails'>Deliver To</h4>
          <p>{delivery.number} {delivery.street}, {delivery.suburb}</p>
          <p>{delivery.city}</p>
          <p>{delivery.postcode}</p>
        </div>
      )
    }
  )

  const purchasedItems = checkoutItems.map(
    (item) => {
      
      if(item.size === undefined){
        return(
          <div key={item.id}>
            <p>{item.product}</p>            
            <p>Quantity: {item.quantity}</p>
            <p>${item.price * item.quantity}</p>
            <hr></hr>
          </div>
        )
      }

      return(
        <div key={item.id}>
          <p>{item.product}</p>
          <p>Size: {item.size}</p>
          <p>Quantity: {item.quantity}</p>
          <p>${item.price * item.quantity}</p>
          <hr></hr>
        </div>
      )
    }
  )

  if(processingPayment) {
    return(
      <div className='loadingImgContainer'>
        <img src='images/LoadingImage.png' alt='' className='loadingImg rotate' />
        <h1 className='loadingText'>Processing Payment...</h1>
      </div>
    )
  }

  if(paid) {
    return(
      <div className='checkoutContainer'>
        <br></br>
        <h3 className='cartHeading'>Thankyou for your purchase!</h3>
        {contactInfo}
        {deliveryInfo}
        <h3 className='cartItemDetails'>Purchased Products</h3>
        <hr></hr>
        {purchasedItems}
        <h4 className='cartItemDetails'>GST paid: ${gst}</h4>
        <h4 className='cartItemDetails'>Total amount paid: ${paymentAmount}</h4>
      </div>
    )
  }

  return (
    <div className='checkoutContainer'>
      <h1 className='checkoutHeading'>CHECKOUT</h1>
      <h4 className='cartHeading'>Contact Details</h4>
      <div className='purchaseDetails'>
        <label>First Name:</label>
        <input type='text' ref={firstName} defaultValue='John'></input>
        <label>Last Name:</label>
        <input type='text' ref={lastName} defaultValue='Doe'></input>
        <label>Contact Number:</label>
        <input type='text' ref={contactNum} defaultValue='0211234567'></input>
        <label>Email:</label>
        <input type='text' ref={emailAddress} defaultValue='johndoe@gmail.com'></input>
      </div>
      <hr></hr>
      <h4 className='cartHeading'>Delivery Details</h4>
      <div className='purchaseDetails'>
        <label>Street Number:</label>
        <input type='text' ref={delivNum} defaultValue='99'></input>
        <label>Street Name:</label>
        <input type='text' ref={delivStreet} defaultValue='Test Street'></input>
        <label>Suburb:</label>
        <input type='text' ref={delivSuburb} defaultValue='Testville'></input>
        <label>City:</label>
        <input type='text' ref={delivCity} defaultValue='Testington'></input>
        <label>Postcode:</label>
        <input type='text' ref={delivPostcode} defaultValue='4321'></input>
      </div>
      <hr></hr>
      <h4 className='cartHeading'>Card Details</h4>
      <div className='purchaseDetails'>
        <label>Name on Card:</label>
        <input type='text' defaultValue='John Doe'></input>
        <label>Card Number:</label>
        <input type='text' defaultValue='0000-0000-0000-0000'></input>
        <label>Expiry Date:</label>
        <input type='text' defaultValue='MM/YY'></input>
        <label>CVV:</label>
        <input type='text' defaultValue='123'></input>
      </div>
      <hr></hr>
      <h4 className='cartHeading'>Products</h4>
      {cartList}
      <br></br>
      <h4 className='cartHeading'>Total Price: ${totalPrice}</h4>
      <button onClick={ConfirmPayment} className='addToCartBtn'>CONFIRM PAYMENT</button>
    </div>
  )
}
