import React, { useState } from "react";
import axios from 'axios';
import { backendUrl } from '../App.jsx';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {toast} from 'sonner'
import {useNavigate} from 'react-router-dom'
import { SyncLoader } from "react-spinners";

const Login = ({setToken}) => {
    const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token)
        navigate('/')
        toast.success(response.data.message,{
          duration:2000,
        })
      }
    } catch (error) {
     if(error.response && error.response.data){
         toast.error(error.response.data.message,{
          duration:2000,
         })
     }else{
        toast.error("Something went wrong",{
          duration:2000
        });
     }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-prata text-center text-gray-800 mb-6">
          Admin Panel
        </h1>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="your@gmail.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button disabled={loading}
            type="submit"
            className="w-full bg-black font-prata hover:bg-zinc-700 hover:text-white text-white py-2 rounded-md hover:border-gray-300 border transition duration-200"
          >
            {loading ? <SyncLoader size={10} color="white"/>:"Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
