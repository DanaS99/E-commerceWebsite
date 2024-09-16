import React from 'react'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/features/auth/authSlice'

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
          await logoutUser().unwrap()
          alert('Logged out successfully')
          dispatch(logout())
          navigate('/')
         } catch (error) {
          console.error('Failed to log out', error)
        }
     } 

  const navItems = [
    {
      path: '/dashboard/admin',
      label: 'Admin Dashboard',
    },
    {
      path: '/dashboard/add-new-post',
      label: 'Add New Product',
    },
    {
      path: '/dashboard/manage-products',
      label: 'Manage Products',
    },
    {
      path: '/dashboard/users',
      label: 'Users',
    },
    {
      path: '/dashboard/manage-orders',
      label: 'Manage Orders',
    },
  ];

  return (
    <div className='flex flex-col justify-between space-y-5 bg-white p-8 md:h-screen'>
      <div>
        <div className='nav__logo'>
          <Link to='/' className='text-sx font-bold'>
            Dana<span className='text-red-500'>.</span>
          </Link>
          <p className='text-sx italic'>User dashboard</p>
        </div>
        <hr className='mt-5' />
        <ul className='space-y-5 pt-5'>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'text-blue-600 font-bold' : 'text-black'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className='mb-3'>
        <hr className='mb-3' />
        <button
          onClick={handleLogout}
          className='font-medium bg-primary text-white py-1 px-5 rounded-sm'
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard