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
        path: '/cancel',
        element: <div>Payment canceled</div>,
      },
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
        element: <div>User payment</div>,
      },
      {
        path: 'profile',
        element: <div>User profile</div>,
      },
      {
        path: 'reviews',
        element: <div>User reviews</div>,
      },

      //admin routes (only admin can access these routes)
      {
        path: 'admin',
        element: (
          <PrivateRoute role='admin'>
            <div>Admin dashboard</div>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-new-post',
        element: (
          <PrivateRoute role='admin'>
            <div>add new post dashboard</div>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <PrivateRoute role='admin'>
            <div>mange products dashboard</div>
          </PrivateRoute>
        ),
      },
      {
        path: 'update-product/:id',
        element: (
          <PrivateRoute role='admin'>
            <div>update product dashboard</div>
          </PrivateRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoute role='admin'>
            <div>users dashboard</div>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute role='admin'>
            <div>manage orders dashboard</div>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
