import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/products.json'
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/product/productsApi';

const CategoriesPage = () => {

  const {categoryName} = useParams();
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const filtered = products.filter((product)=> product.category === categoryName.toLowerCase());
    setFilteredProducts(filtered);
    //console.log(filtered);
}, [categoryName])

useEffect(() => {
    window.scrollTo(0, 0)
})
const { data, error, isLoading } = useFetchAllProductsQuery({
  category: categoryName.toLowerCase(),
});

useEffect(() => {
  if (data) {
    setFilteredProducts(data.products);
  }
}, [data]);

  return (
    <>
      <section className='section__container bg-primary-light'>
           <h2 className='section__header capitalize'>{categoryName}</h2>
           <p className='section__subheader'>Browse a diverse range of categories, from chic dresses to amazing accessories.</p>
      </section>

      <div className='section__container'>
        <ProductCards products={filteredProducts}/>
      </div>
    </>
  )
}

export default CategoriesPage