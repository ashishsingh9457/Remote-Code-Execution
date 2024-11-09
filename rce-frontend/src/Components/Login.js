import React from 'react';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 transition-colors duration-300 dark:bg-gray-600" id="body">
            <main className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transition-colors duration-300 dark:bg-gray-600 dark:text-white">
                <form>
                    <img className="mb-4 mx-auto" src="./assets/images/RCE.png" alt="Logo" width="67" height="63" />
                    <h1 className="mb-6 text-3xl font-semibold text-center">Login</h1>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email address</label>
                        <input type="email" className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" id="email" placeholder="name@example.com" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                        <input type="password" className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" id="password" placeholder="Password" />
                    </div>

                    <div className="flex items-center mb-4">
                        <input className="mr-2" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="text-sm" htmlFor="flexCheckDefault">Remember me</label>
                    </div>
                    <button className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300" type="submit" id="submit">Sign in</button>
                    <p className="mt-5 text-center text-gray-500 dark:text-gray-400">&copy; Aashish Pandey 2024</p>
                </form>
            </main>
        </div>
    );
};

export default Login;
