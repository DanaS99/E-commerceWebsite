import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/product/productsApi';
import TextInput from '../productAdd/TextInput';
import SelectInput from '../productAdd/SelectInput';


const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Dress', value: 'dress' },
    { label: 'Jewelry', value: 'jewelry' },
    { label: 'Cosmetics', value: 'cosmetics' }
];

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' }
];

const UpdateProduct = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
        image: ''
    });


    const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id); 
    const { name, category, color, description, image: imageURL, price } = productData?.product || {};

    const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();

    useEffect(() => {
        if (productData) {
            setProduct({
                name: name || '',
                category: category || '',
                color: color || '',
                price: price || '',
                description: description || '',
                image: imageURL || ''
            });
        }
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };
 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            author: user?._id
        };

        try {
            await updateProduct({ id: id, ...updatedProduct }).unwrap();
            alert('Product updated successfully!');
            await refetch();
            navigate("/dashboard/manage-products");

        } catch (err) {
            console.error('Failed to update product:', err);
        }

    };

    if (isProductLoading) return <p>Loading product...</p>;
    if (fetchError) return <p className="text-red-500">Error fetching product: {fetchError.message}</p>;

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* product name */}
                <TextInput
                    label="Product Name"
                    name="name"
                    placeholder="Ex: Diamond Earrings"
                    value={product.name}
                    onChange={handleChange}
                />

                {/* category */}
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />

                {/* color */}
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />

                {/* price */}
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="50"
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
                  id="image"
                  onChange={handleChange}
                  placeholder='Upload a product image'
                  className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                  
                />
                

                {/* description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        rows={6}
                        name="description"
                        id="description"
                        value={product.description}
                        placeholder='Write a product description'
                        onChange={handleChange}
                        className="add-product-InputCSS"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="add-product-btn"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Update Product'}
                    </button>
                </div>
            </form>

            {updateError && <p className="text-red-500 mt-4">Error updating product: {updateError.message}</p>}
        </div>
    );
};

export default UpdateProduct;
