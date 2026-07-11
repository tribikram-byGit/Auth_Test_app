import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile(){
    const [data, setData] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const fetchProtectedData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('/api/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { message, user } = response.data;
            setData(user);
            setMessage(message);
            setError('');

            setTimeout(() => {
                setMessage('');
            }, 2000);

        } catch (err) {
            const errMsg = err.response?.data?.message || 'Failed to fetch data';
            setError(errMsg);
            setMessage('');

            setTimeout(() => {
                setError('');
            }, 9000);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setData({});
        setMessage('');

        navigate('/'); 
    };

    useEffect(()=>{
    fetchProtectedData()
  },[])

    return(
        <div className="card flex flex-col gap-2">
            <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 flex flex-col gap-2 w-full max-w-sm px-4">
    
                {/* Success Message */}
                {message && (
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-800 bg-emerald-50/90 border border-emerald-200/50 rounded-xl shadow-lg shadow-emerald-100/40 backdrop-blur-md animate-fade-in-down">
                        
                        <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>{message}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-800 bg-rose-50/90 border border-rose-200/50 rounded-xl shadow-lg shadow-rose-100/40 backdrop-blur-md animate-fade-in-down">
                        
                        <svg className="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p>{error}</p>
                    </div>
                )}
                
            </div>

            <div className="flex -mt-18 justify-end w-84">
                <button 
                onClick={handleLogout} 
                className="px-4 py-1 mt-6 text-red-300 border border-red-500 bg-rose-600/50 hover:bg-rose-700/40 rounded-xl cursor-pointer"
                >
                Logout
                </button>
            </div>

            <div className="w-84 h-[50vh] flex flex-col px-4 py-6 bg-slate-700/50 border border-slate-500 rounded-xl">
                <h2 className="text-md px-1 mb-3 text-zinc-100 bg-gray-600 rounded-xl">Name: <span className="text-md font-medium"> {data.fullname}</span></h2>
                <h2 className="text-md px-1 mb-6 text-gray-100 bg-gray-600 rounded-xl">Email: <span className="text-sm font-medium"> {data.email}</span></h2>
                <span className="text-md text-gray-100 mb-2">Job Title: </span>
                <p className="text-sm text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, sequi officia! Quis rem, itaque facilis accusantium modi natus ex optio tenetur cumque eum laborum, ipsam, dolorum nesciunt quisquam</p>
            </div>
            
        </div>
    )
}

export default Profile