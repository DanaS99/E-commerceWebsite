import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import CategoriesPage from '../pages/category/CategoriesPage';
import Search from '../search/Search';
import ShopPage from '../pages/shop/ShopPage';
import SingleProduct from '../pages/shop/productDetails/SingleProduct';
import Login from '../components/Signing/Login';
import Signup from '../components/Signing/Signup';
import PaymentSuccess from '../components/Payment/PaymentSuccess';
import DashboardLayout from '../pages/dashboard/dashboardLayout';
import PrivateRoute from './PrivateRoute';
import UserDashboardMain from '../pages/dashboard/user/dashboard/UserDashboardMAin';
import UserOrders from '../pages/dashboard/user/User/UserOrders';
import OrderDetails from '../pages/dashboard/user/Order/OrderDetails';
import UserPayment from '../pages/dashboard/user/User/UserPayment';
import UserReviews from '../pages/dashboard/user/User/UserReviews';
import UserProfile from '../pages/dashboard/user/User/UserProfile';
import AdminDashboardMain from '../pages/dashboard/admin/dashboard/AdminDashboardMain';
import ManageProducts from '../pages/dashboard/admin/manageProduct/ManageProducts';
import UpdateProduct from '../pages/dashboard/admin/manageProduct/UpdateProduct';
import AddProduct from '../pages/dashboard/admin/productAdd/AddProduct';
import ManageUsers from '../pages/dashboard/admin/users/ManageUsers';
import ManageOrders from '../pages/dashboard/admin/manageOrders/ManageOrders';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/categories/:categoryName',
        element: <CategoriesPage />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/shop',
        element: <ShopPage />,
      },
      {
        path: '/shop/:id',
        element: <SingleProduct />,
      },
      {
        path: '/success',
        element: <PaymentSuccess />,
      },
      {
        path: '/orders/:orderId',
        element: <OrderDetails />   
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Signup />,
  },

  //dashboard routes
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ), //user private routes
    children: [
      //user routes
      {
        path: '',
        element: <UserDashboardMain />,
      },
      {
        path: 'orders',
        element: <UserOrders /> ,
      },
      {
        path: 'payments',
        element: <UserPayment />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
      {
        path: 'reviews',
        element: <UserReviews />
      },

      //admin routes (only admin can access these routes)
      {
        path: 'admin',
        element: (
          <PrivateRoute role='admin'>
            <AdminDashboardMain />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-new-post',
        element: (
          <PrivateRoute role='admin'>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <PrivateRoute role='admin'>
            <ManageProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'update-product/:id',
        element: (
          <PrivateRoute role='admin'>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute role='admin'>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute role='admin'>
            <ManageOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
