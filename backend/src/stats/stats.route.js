const express = require('express');
const User = require('../users/user.model');
const Order = require('../orders/orders.model');
const Reviews = require('../reviews/reviews.model');
const Products = require('../products/products.model');
const router = express.Router();

//user stats by email
router.get('/user-stats/:email', async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    //sum of all orders
    const totalPaymentResult = await Order.aggregate([
      { $match: { email: email } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);

    const totalPaymentAmount =
      totalPaymentResult.length > 0 ? totalPaymentResult[0].totalAmount : 0;

    //get total review
    const totalReviews = await Reviews.countDocuments({ userId: user._id });

    //get purchased products Ids
    const purchasedProductsIds = await Order.distinct('products.productId', {
      email: email,
    });
    //get total purchased products
    const totalPurchasedProduct = purchasedProductsIds.length;

    res.status(200).send({
      totalPayments: totalPaymentAmount.toFixed(2),
      totalReviews,
      totalPurchasedProduct,
    });
  } catch (error) {
    console.log('Error fetching user stats...', error);
    res.status(500).send({ message: 'Error fetching user stats..' });
  }
});

//admin stats
router.get('/admin-stats', async (req, res) => {
  try {
    //get total users
    const totalUsers = await User.countDocuments();

    //get total orders
    const totalOrders = await Order.countDocuments();

    //get total reviews
    const totalReviews = await Reviews.countDocuments();

    //get total products
    const totalProducts = await Products.countDocuments();

    //get total revenue
    const totalEarningResult = await Order.aggregate([
      { $group: { _id: null, totalEarnings: { $sum: '$amount' } } },
    ]);

    const totalEarning =
      totalEarningResult.length > 0 ? totalEarningResult[0].totalEarnings : 0;

    //monthlyEarningResult
    const monthlyEarningResult = await Order.aggregate([
      {
        $group: {
          _id: { month:  { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          MonthlyEarnings: { $sum: '$amount' },
        },
      },
      {
        $sort: { "_id.year" : 1 , "_id.moth":  1 },
      },
    ]);

    //format monthly earning
    const monthlyEarnings = monthlyEarningResult.map((entry) => ({
  month: entry._id.month,
  year: entry._id.year,
  earnings: entry.MonthlyEarnings.toFixed(2),
}));

    res.status(200).send({
      totalUsers,
      totalOrders,
      totalReviews,
      totalProducts,
      totalEarning,
      monthlyEarnings
    });
  } catch (error) {
    console.log('Error fetching admin stats...', error);
    res.status(500).send({ message: 'Error fetching admin stats..' });
  }
});

module.exports = router;
