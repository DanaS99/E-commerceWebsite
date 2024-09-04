import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars/RatingStars'

const SingleProduct = () => {

  const { id } = useParams()
  //console.log(id);  
  

  return (
    <>
        <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Single Product Page</h2>
        <div className='section__subheader space-x-2'>
            <span className='hover:text-primary'>
                <Link to='/'>home</Link>
                <i className="ri-arrow-right-s-line"></i>
            </span>
            <span className='hover:text-primary'>
                <Link to='/shop'>shop</Link>
                <i className="ri-arrow-right-s-line"></i>
            </span>
            <span className='hover:text-primary'>
                product name
            </span>
        </div>
      </section>

      <section className='section__container mt-8'>
          <div className='flex flex-col items-center md:flex-row gap-8'>
               <div className='md:w-1/2 w-full'>
                    <img src='' alt=''/>
               </div>
               <div className='md:w-1/2 w-full'>
                    <h3 className='text-2xl font-semibold mb-4'>{}</h3>
                    <p className='text-xl text-primary mb-4'>{}<s>{}</s></p>
                    <p className='text-gray-400 mb-4'>{}</p>

                    <div>
                        <p><strong>Category:</strong>{}</p>
                        <p><strong>Color:</strong>{}</p>
                        <div className='flex gap-1 items-center'>
                            <strong>Rating:</strong>
                            <RatingStars rating={''}/>
                        </div>
                    </div>

                    <button className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>
                        Add to Cart
                    </button>
               </div>
          </div>
      </section>

      <section className='secton__container mt-8'>
        Reviews Here
      </section>
    </>
  )
}

export default SingleProduct