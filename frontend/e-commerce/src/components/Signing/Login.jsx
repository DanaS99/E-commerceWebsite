import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { setUser } from '../../redux/features/auth/authSlice';


const Login = () => {

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation()
  //console.log(loginUser);
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    const data = {
        email,
        password
    }
    console.log("data",data);

    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      const { token, user } = response;
      dispatch(setUser({user}))
      alert('Login Successfully')
      navigate('/')
    } catch (error) {
      setMessage('Please prodive a valid email and password')
      console.log(error);
    }
  }

  return (
    <section className='flex items-center justify-center h-screen'>
      <div className='max-w-sm p-8 mx-auto bg-white border shadow'>
        <h2 className='pt-5 text-2xl font-semibold'>Please Login</h2>
        <form className='max-w-sm pt-8 mx-auto space-y-5' onSubmit={handleLogin}>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email Address'
            required
            className='w-full px-5 py-3 bg-gray-100 focus:outline-none'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
            className='w-full px-5 py-3 bg-gray-100 focus:outline-none'
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            message && <p className='text-red-500'>{message}</p>
          }
          <button type='submit' className='w-full py-3 mt-5 font-medium text-white rounded-md bg-primary hover:bg-indigo-500'>Login</button>
          <p className='my-5 text-sm italic text-center'>Don't have an account? <Link to='/register' className='px-1 text-red-700 underline'>Register </Link> here</p>
        </form>
      </div>
    </section>
  );
};

export default Login;
