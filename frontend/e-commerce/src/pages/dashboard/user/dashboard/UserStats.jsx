import React from 'react';

const UserStats = ({stats}) => {
  return (
    <div className='my-5 space-y-4'>
      {/* <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
             <div>
                <h2>Total Payments</h2>
             </div>
        </div> */}
      <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
        <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
          <h2 className='text-xl font-semibold mb-2'>Total Payments</h2>
          <p className='text-2xl font-bold'>${stats?.totalPayments}</p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
          <h2 className='text-xl font-semibold mb-2'>Total Reviews</h2>
          <p className='text-2xl font-bold'>${stats?.totalReviews}</p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
          <h2 className='text-xl font-semibold mb-2'>Total Purchased Products</h2>
          <p className='text-2xl font-bold'>${stats?.totalPurchasedProduct}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
