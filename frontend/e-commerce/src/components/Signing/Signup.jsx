import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/features/auth/authApi';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser, {isLoading}] = useRegisterUserMutation()
  const navigate = useNavigate()
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };
    console.log(data);

    try {
      await registerUser(data).unwrap()
      alert('Registration Successfully Done')
      navigate('/login')
    } catch (error) {
      setMessage('Registration Failed')
    }
  };

  return (
    <section className='flex items-center justify-center h-screen'>
      <div className='max-w-sm p-8 mx-auto bg-white border shadow'>
        <h2 className='pt-5 text-2xl font-semibold'>Please Register</h2>
        <form
          className='max-w-sm pt-8 mx-auto space-y-5'
          onSubmit={handleRegister}
        >
          <input
            type='name'
            name='name'
            id='name'
            placeholder='Username'
            required
            className='w-full px-5 py-3 bg-gray-100 focus:outline-none'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
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
          {message && <p className='text-red-500'>{message}</p>}
          <button
            type='submit'
            className='w-full py-3 mt-5 font-medium text-white rounded-md bg-primary hover:bg-indigo-500'
          >
            Register
          </button>
          <p className='my-5 text-sm italic text-center'>
           Already have an account? Please{' '}
            <Link to='/login' className='px-1 text-red-700 underline'>
              Login{' '}
            </Link>{' '}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
