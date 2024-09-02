import React from 'react'
import insta1 from '../../assets/instagram-1.jpg'
import insta2 from '../../assets/instagram-2.jpg'
import insta3 from '../../assets/instagram-3.jpg'
import insta4 from '../../assets/instagram-4.jpg'
import insta5 from '../../assets/instagram-5.jpg'
import insta6 from '../../assets/instagram-6.jpg'

const Footer = () => {
  return (
    <>
        <footer className='section__container footer__container'>
            <div className='footer__col'>
                <h4 className='uppercase'>Contact Info</h4>
                <p>
                    <span>
                        <i className="ri-map-pin-fill"></i>
                    </span> 123, London Bridge Street, London
                </p>
                <p>
                    <span>
                        <i className="ri-mail-fill"></i>
                    </span> service@gmail.com
                </p>
                <p>
                    <span>
                        <i className="ri-phone-fill"></i>
                    </span> (+961)00000000
                </p>
            </div>

            <div className='footer__col'>
                <h4 className='uppercase'>Company</h4>
                <a href='/'>Home</a>
                <a href='/'>About Us</a>
                <a href='/'>Work With Us</a>
                <a href='/'>Our Blog</a>
                <a href='/'>Terms & Conditions</a>
            </div>

            <div className='footer__col'>
                <h4 className='uppercase'>useful links</h4>
                <a href='/'>Help</a>
                <a href='/'>Track My Order</a>
                <a href='/'>Men</a>
                <a href='/'>Women</a>
                <a href='/'>Dresses</a>
            </div>

            <div className='footer__col'>
                <h4 className='uppercase'>instagram</h4>
                <div className='instagram__grid'>
                    <img src={insta1} alt='insta1'/>
                    <img src={insta2} alt='insta2'/>
                    <img src={insta3} alt='insta3'/>
                    <img src={insta4} alt='insta4'/>
                    <img src={insta5} alt='insta5'/>
                    <img src={insta6} alt='insta6'/>
                </div>
            </div>
        </footer>

        <div className='footer__bar'>
            Copyright @2024 by Dana. All rights reserved.
        </div>
    </>
  )
}

export default Footer