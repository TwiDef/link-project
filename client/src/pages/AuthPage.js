import React, { useEffect, useState } from 'react';
import { useHttp } from './../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

const AuthPage = () => {
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/registration', 'POST', { ...form })
            console.log(data)
        } catch (error) {

        }
    }

    return (
        <div className='auth__page mt-8'>
            <h1 className=' text-4xl font-bold text-center mb-10'>Cut the link</h1>

            <div className="m-auto w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Authorization</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email
                        </label>
                        <input
                            onChange={changeHandler}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder:text-lg" placeholder="example@email.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your password
                        </label>
                        <input
                            onChange={changeHandler}
                            disabled={loading}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-lgSS rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white placeholder:text-lg" required />
                    </div>
                    <div className='flex gap-10'>

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login
                        </button>

                        <button
                            onClick={registerHandler}
                            disabled={loading}
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Sign in
                        </button>

                    </div>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AuthPage;