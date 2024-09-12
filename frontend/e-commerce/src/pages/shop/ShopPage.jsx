import React, { useEffect, useState } from 'react';
import products from '../../data/products.json';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/product/productsApi';

const ShopPage = () => {
  //const [shopProducts, setShopProducts] = useState(products);
  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });



console.log('here i am shop');

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);
  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products...</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const filters = {
    categories: ['all', 'accessories', 'dress', 'jewelry', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRange: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $100', min: 50, max: 100 },
      { label: '$100 - $200', min: 100, max: 200 },
      { label: '$200 and above', min: 200, max: Infinity },
    ],
  };

  // const applyFilters = () => {
  //   let filteredProducts = products;

  //   if (filtersState.category && filtersState.category !== 'all') {
  //     filteredProducts = filteredProducts.filter(
  //       (product) => product.category === filtersState.category
  //     );
  //   }

  //   if (filtersState.color && filtersState.color !== 'all') {
  //     filteredProducts = filteredProducts.filter(
  //       (product) => product.color === filtersState.color
  //     );
  //   }

  //   if (filtersState.priceRange) {
  //     const [minPrice, maxPrice] = filtersState.priceRange
  //       .split('-')
  //       .map(Number);
  //     filteredProducts = filteredProducts.filter(
  //       (product) => product.price >= minPrice && product.price <= maxPrice
  //     );
  //   }

  //   setShopProducts(filteredProducts);
  // };

  // useEffect(() => {
  //   applyFilters();
  // }, [filtersState]);

  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: '',
    });
  };

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>
          Browse a diverse range of categories, from chic dresses to amazing
          accessories.
        </p>
      </section>

      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* right side */}
          <div>
            <h3 className='text-xl font-medium mb-4'>
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

            <div className='mt-6 flex justify-center'>
              <button
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  } rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
