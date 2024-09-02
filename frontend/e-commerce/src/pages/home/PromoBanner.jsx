import React from 'react'

const PromoBanner = () => {
  return (
    <div className='section__container banner__container'>
        <div className='banner__card'>
            <span>
                <i class="ri-truck-line"></i>
            </span>
            <h4>Free Delivery</h4>
            <p>Offers convenience and the ability to shop all over the world!</p>
        </div>
        <div className='banner__card'>
            <span>
                <i class="ri-money-dollar-circle-line"></i>
            </span>
            <h4>100% Money Back Guaranty</h4>
            <p>Offers convenience and the ability to shop all over the world!</p>
        </div>
        <div className='banner__card'>
            <span>
                <i class="ri-user-voice-line"></i>
            </span>
            <h4>String Support</h4>
            <p>Offers convenience and the ability to shop all over the world!</p>
        </div>
    </div>
  )
}

export default PromoBanner