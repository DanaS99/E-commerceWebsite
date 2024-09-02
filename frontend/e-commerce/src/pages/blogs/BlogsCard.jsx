import React from 'react';

const BlogsCard = ({ blogs }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className='blog__card cursor-pointer hover:scale-105 transition-all duration-300'
        >
          <img src={blog.imageUrl} alt={blog.title} />
          <div className='blog__card__content'>
             <h6>{blog.subtitle}</h6>
             <h4>{blog.title}</h4>
             <p>{blog.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsCard;
