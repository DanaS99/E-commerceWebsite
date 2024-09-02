import React from 'react';
import BlogsCard from './BlogsCard';
import blogs from '../../data/blogs.json';

const Blogs = () => {
  return (
    <section className='section__container blog__container'>
      <h2 className='section__header'>Latest From Blog</h2>
      <p className='section__subheader'>
        Discover the picks: Choose your style with our collection of trending
        for women's fashion
      </p>

      <BlogsCard blogs={blogs}/>
    </section>
  );
};

export default Blogs;
