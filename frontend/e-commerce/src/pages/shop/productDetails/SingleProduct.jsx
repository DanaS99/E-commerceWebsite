import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from '../../../components/RatingStars/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/product/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';

const SingleProduct = () => {
  console.log('singlep');
  const { id } = useParams();
  //console.log(id);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  //console.log(data);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  console.log(singleProduct);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return console.log(error);

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Single Product Page</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'>
            <Link to='/'>home</Link>
            <i className='ri-arrow-right-s-line'></i>
          </span>
          <span className='hover:text-primary'>
            <Link to='/shop'>shop</Link>
            <i className='ri-arrow-right-s-line'></i>
          </span>
          <span className='hover:text-primary'>{singleProduct.name}</span>
        </div>
      </section>

      <section className='section__container mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
          <div className='md:w-1/2 w-full'>
            <img src={singleProduct?.image} alt={singleProduct?.name} />
          </div>
          <div className='md:w-1/2 w-full'>
            <h3 className='text-2xl font-semibold mb-4'>
              {singleProduct?.name}
            </h3>
            <p className='text-xl text-primary mb-4'>
              ${singleProduct?.price}{' '}
              {singleProduct?.oldPrice && (
                <s className='ml-1'>{singleProduct?.oldPrice}</s>
              )}
            </p>
            <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

            <div>
              <p>
                <strong>Category:</strong>
                {singleProduct?.category}
              </p>
              <p>
                <strong>Color:</strong>
                {singleProduct?.color}
              </p>
              <div className='flex gap-1 items-center'>
                <strong>Rating:</strong>
                <RatingStars rating={singleProduct?.rating} />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className='mt-6 px-6 py-3 bg-primary text-white rounded-md'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <section className='secton__container mt-8'>
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
