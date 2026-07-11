import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

function Register () {
  const [formData, setFormData] = useState({ fullname:'', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', formData);
            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                console.log('Registration successful! Token saved.');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
        }
    };


    return(
        <div className="card flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-slate-200">Register your Account</h2>
          <div className="w-106 px-4 py-10 mt-12 flex flex-col items-center bg-gray-600/60 border-2 border-gray-500 rounded-xl">
            <form onSubmit={(e)=>{handleSubmit(e)}}>
              <input className="w-full mb-4 bg-gray-100 hover:bg-gray-50 text-purple-700 px-3 py-1.5 rounded-xl outline-none" type="text" placeholder="Full Name" name="fullname" value={formData.fullname} onChange={(e)=>{handleChange(e)}}/>
              <input className="w-full mb-4 bg-gray-100 hover:bg-gray-50 text-purple-700 px-3 py-1.5 rounded-xl outline-none" type="email" placeholder="email" name="email" value={formData.email} onChange={(e)=>{handleChange(e)}}/>
              <input className="w-full mb-6 bg-gray-100 hover:bg-gray-50 text-purple-700 px-3 py-1.5 rounded-xl outline-none" type="password" placeholder="password" value={formData.password} name="password" onChange={(e)=>{handleChange(e)}}/>
              <input className="bg-sky-700 text-white border-b-2 border-b-sky-300 active:scale-95 px-3 py-1.5 rounded-xl" type="submit" value="Register"/>
            </form>
            <span className="text-gray-200">Already have an account <Link to="/" className="text-sky-500">Login</Link></span>
          </div>
        </div>
    )
}

export default Register