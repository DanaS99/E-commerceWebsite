import React, { useState } from 'react';
import products from '../data/products.json';
import ProductCards from '../pages/shop/ProductCards';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProducts, setFilterProducts] = useState(products);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilterProducts(filtered);
  };

  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Search Products</h2>
        <p className='section__subheader'>
          Browse a diverse range of categories, from chic dresses to amazing
          accessories.
        </p>
      </section>

      <section className='section__container'>
        <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
          <input
            type='text'
            value={searchQuery}
            placeholder='Search for products...'
            className='search-bar w-full max-w-4xl p-2 border rounded'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'>Search</button>
        </div>

        <ProductCards products={filterProducts}/>
      </section>
    </>
  );
};

export default Search;
