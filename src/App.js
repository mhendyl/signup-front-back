import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './App.css'
import axios from 'axios';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required').matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        'First Name can only contain characters only'
    ),
  lastName: yup.string().required('Last name is required').matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        'Last Name can only contain characters only'
    ),
  dob: yup.date().required('Date of birth is required').nullable(),
  phoneNumber: yup.string().required('Phone number is required').matches(
    /^[0-9]*$/gi,
        'Phone number only allowed numbers'
    ),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3030/register',
      data: data,
      headers: {
        'Accept': 'application/json',
        
      }
    }).then((res) => {
      console.log('>>> response', res);
    }).then((err) => {
      console.error('>>> err', err);
    });
    console.log('>>> data', data); 
  };

  return (
    <div className='flex h-[100vh]'>
      <div className='w-6/12 flex bg-black' >
        <h1 className='font-bold text-8xl m-auto text-white'>SIGN UP</h1>
      </div >
      <div className='w-6/12 px-40 py-6'>
        <form className="flex justify-between flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
          <h3 className='text-lg font-semibold'>Sign Up Form</h3>
          <div>
            <label className='text-sm text-gray-600'>First Name:</label>
            <input className='border-b border-black block px-1 py-1 focus:outline-none w-[50%]' {...register('firstName')} />
            {errors.firstName && <p className='text-red-600 text-xs'>{errors.firstName.message}</p>}
          </div>
          <div>
            <label className='text-sm text-gray-600'>Last Name:</label>
            <input className='border-b border-black block px-1 py-1 focus:outline-none w-[50%]' {...register('lastName')} />
            {errors.lastName && <p className='text-red-600 text-xs'>{errors.lastName.message}</p>}
          </div>
          <div>
            <label className='text-sm text-gray-600'>Date of Birth:</label>
            <input className='border-b border-black block px-1 py-1 focus:outline-none w-[50%]' type="date" {...register('dob')} />
            {errors.dob && <p className='text-red-600 text-xs'>{errors.dob.message}</p>}
          </div>
          <div>
            <label className='text-sm text-gray-600'>Phone Number:</label>
            <input className='border-b border-black block px-1 py-1 focus:outline-none w-[50%]' {...register('phoneNumber')} />
            {errors.phoneNumber && <p className='text-red-600 text-xs'>{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <label className='text-sm text-gray-600'>Address:</label>
            <input className='border-b border-black block px-1 py-1 focus:outline-none w-[50%]' {...register('address')} />
            {errors.address && <p className='text-red-600 text-xs'>{errors.address.message}</p>}
          </div>
          <div>
            <label className='text-sm text-gray-600'>Email:</label>
            <input className='border-b border-black block px-1 py-1 focus:outline-none w-[50%]' type="email" {...register('email')} />
            {errors.email && <p className='text-red-600 text-xs'>{errors.email.message}</p>}
          </div>
          <button className='bg-green-500 text-white py-5 px-2 rounded-xl font-bold uppercase' type="submit">Submit</button>
        </form>
      </div>
    </div >
  );
};

export default App;
