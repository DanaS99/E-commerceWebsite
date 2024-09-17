import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../../../../redux/features/product/productsApi';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

const categories = [
  { label: 'Select Category', value: '' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jewelry', value: 'jewelry' },
  { label: 'Cosmetics', value: 'cosmetics' },
];

const colors = [
  { label: 'Select Color', value: '' },
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Gold', value: 'gold' },
  { label: 'Blue', value: 'blue' },
  { label: 'Silver', value: 'silver' },
  { label: 'Beige', value: 'beige' },
  { label: 'Green', value: 'green' },
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    color: '',
    price: '',
    description: '',
  });
  const [image, setImage] = useState('');

  const [addProduct, { isLoading, error }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.color ||
      !product.description
    ) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await addProduct({ ...product, image, author: user?._id }).unwrap();
      alert('Product added successfully!');
      setProduct({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
      });
      setImage('');
      navigate('/shop');
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  // console.log("This is the image:", image)
  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-6'>Add New Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextInput
          label='Product Name'
          name='name'
          placeholder='Ex: Diamond Earrings'
          value={product.name}
          onChange={handleChange}
        />
        <SelectInput
          label='Category'
          name='category'
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <SelectInput
          label='Color'
          name='color'
          value={product.color}
          onChange={handleChange}
          options={colors}
        />
        <TextInput
          label='Price'
          name='price'
          type='number'
          placeholder='50'
          value={product.price}
          onChange={handleChange}
        />

        {/* image upload */}
        <label
          htmlFor='profileImage'
          className='block text-gray-700 text-sm font-medium'
        >
          Profile Image
        </label>
        <input
          type='text'
          name='image'
          id='image'
          onChange={handleChange}
          placeholder='Upload a product image'
          className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
        />
        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            rows={6}
            name='description'
            id='description'
            value={product.description}
            placeholder='Write a product description'
            onChange={handleChange}
            className='add-product-InputCSS '
          />
        </div>

        <div>
          <button
            type='submit'
            className='add-product-btn'
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>

      {error && (
        <p className='text-red-500 mt-4'>
          Error adding product: {error.message}
        </p>
      )}
    </div>
  );
};

export default AddProduct;
