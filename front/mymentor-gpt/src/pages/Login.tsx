import { useState, FormEventHandler, useEffect } from 'react';
import { FaCompass } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import Notification from '../components/Notification';


const APIURL = import.meta.env.VITE_API_URL;

function LoginPage() {

  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.from === '/protected') {
      setShowNotification(true);

      navigate(location.pathname, { replace: true, state: {} });

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [location.state, location.pathname, navigate]);


  const handleSubmit: FormEventHandler<HTMLFormElement>  = async (e)  => {
    e.preventDefault();
    setError('');

    if (name === '' || password === '') {
      setError('Both fields are required.');
      return;
    }
    const data = {name, password};

    try {
      const response = await fetch(`${APIURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorBody = await response.json();
        setError(errorBody.message || 'Something went wrong');
      } else {
        const result = await response.json();
        localStorage.setItem('username', name);
        localStorage.setItem('password', password);
        console.log('Success:', result);
        navigate('/consult/swot');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }

  };


  return (
    <>

      {showNotification && (
        <Notification message="You need to be logged in to access this page." />
      )}
      <section className="flex items-center justify-center h-screen">
        <div className="max-w-md bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto rounded">
            <p className="flex flex-col sm:flex-row items-center gap-3 my-6">
              <FaCompass className="text-5xl text-cyan-500"/>
              <span className="text-4xl font-rubik font-semibold text-cyan-500 ">MyMenthor</span>
            </p>
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Log In to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                              type="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="flex items-center justify-center">
                          <button type="submit"
                            className="w-1/2 bg-sky-900 text-white p-3 rounded-md font-bold hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >LogIn</button>
                        </div>
                       {loading ? (
                         <p>'Logging In...'</p>
                       ): ''}
                    </form>
                </div>
            </div>
        </div>
      </section>



    </>
  )
}

export default LoginPage
