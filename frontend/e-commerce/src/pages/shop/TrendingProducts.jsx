import React, { useEffect, useState } from 'react';
import ProductCards from './ProductCards';
import products from '../../data/products.json';
import { useFetchAllProductsQuery } from '../../redux/features/product/productsApi';

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: '', // or some default value
    color: '',
    minPrice: 0,
    maxPrice: '',
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (data) {
      setVisibleProducts(8);
    }
  }, [data]);

  if (data) {
    console.log(data.products);
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader'>
        Discover the picks: Choose your style with our collection of trending
        for women's fashion
      </p>

      {/* <ProductCards products={products.slice(0, visibleProducts)} /> */}

      {data ? (
        <ProductCards products={data.products.slice(0, visibleProducts)} />
      ) : (
        <p>Loading...</p> // or some other loading indicator
      )}
      <div className='product__btn'>
        {data && visibleProducts < data.products.length && (
          <button className='btn' onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
