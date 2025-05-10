import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import axios from 'axios';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = ({ token }) => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { backendUrl, setToken, navigate } = useContext(ShopContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });

        toast.success(response.data.message, { duration: 2000 });
        setCurrentState('Login');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });

        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(response.data.message, { duration: 2000 });

        navigate('/');
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(message, { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-12 gap-4 text-gray-800 mb-10"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-prata text-3xl" data-aos="fade-down" data-aos-duration="600">{currentState}</p>
        <hr className="border-none w-8 h-[1.5px] bg-gray-800" />
      </div>

      {currentState === 'Sign Up' && (
        <input
          data-aos="fade-left"
          data-aos-duration="600"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="name"
          className="w-full px-4 py-2 border border-gray-800 outline-none"
          placeholder="Name"
          required
        />
      )}

      <input
        data-aos="fade-right"
        data-aos-duration="600"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        name="email"
        className="w-full px-4 py-2 border border-gray-800 outline-none"
        placeholder="Email"
        required
      />

      {/* Password Input with Show/Hide Icon */}
      <div className="relative w-full" data-aos="fade-up" data-aos-duration="600">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? 'text' : 'password'}
          name="password"
          className="w-full px-4 py-2 border border-gray-800 outline-none pr-10"
          placeholder="Password"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </span>
      </div>

      <div className="w-full flex justify-between text-sm -mt-2">
        {/* {currentState === 'Login' && (
          <p
            data-aos="fade-left"
            data-aos-duration="600"
            className="cursor-pointer text-gray-600 hover:underline hover:text-blue-500"
          >
            Forgot your password?
          </p>
        )} */}
        <p
          data-aos="fade-right"
          data-aos-duration="600"
          className="cursor-pointer text-gray-600 hover:underline hover:text-blue-500"
          onClick={() =>
            setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
          }
        >
          {currentState === 'Login' ? 'Create Account' : 'Already have an account?'}
        </p>
      </div>

      <button
        data-aos="fade-up"
        data-aos-duration="600"
        disabled={loading}
        type="submit"
        className="bg-black text-white px-8 mt-4 py-2.5 font-prata w-full flex justify-center items-center gap-2 min-h-[44px]"
      >
        {loading ? (
          <ClipLoader color="white" size={22} />
        ) : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
