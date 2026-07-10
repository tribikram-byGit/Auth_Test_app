import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

function Login(){
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              const response = await axios.post('/api/login', formData);
              const { token, user } = response.data;
  
              if (token) {
                  localStorage.setItem('token', token);
                  console.log('Logged in successful! Token saved.');
                  navigate('/dashboard');
              }
          } catch (error) {
              console.error('Login failed:', error.response?.data?.message || error.message);
          }
      };
  
    return(
        <div className="card flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-slate-200">Login to your Account</h2>
          <div className="w-106 px-4 py-10 mt-12 flex flex-col items-center bg-gray-600/60 border-2 border-gray-500 rounded-xl">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              <input className="w-full mb-4 bg-gray-100 hover:bg-gray-50 text-indigo-600 px-3 py-1.5 rounded-xl outline-none" type="email" placeholder="email" name="email" value={formData.email} onChange={(e)=>{handleChange(e)}}/>
              <input className="w-full mb-6 bg-gray-100 hover:bg-gray-50 text-purple-700 px-3 py-1.5 rounded-xl outline-none" type="password" placeholder="password" name="password" value={formData.password} onChange={(e)=>{handleChange(e)}}/>
              <input className="bg-sky-700 text-white border-b-2 border-b-sky-300 active:scale-95 px-3 py-1.5 rounded-xl" type="submit" value="Login"/>
            </form>
            <span className="text-gray-200">Don't have an account <Link to="/register" className="text-sky-500">Register</Link></span>
            
          </div>
        </div>
    )
}

export default Login