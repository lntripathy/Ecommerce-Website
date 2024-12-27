import React, { useContext, useState } from 'react'
import login from '../assets/login.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import Context from '../context/Index.jsx';


const Login = () => {

    // hide and show password
    const [showPassword, setShowPassword] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const navigate = useNavigate()
    const { fetchUserDetails } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await axios({
            url: SummaryApi.signIn.url,
            method: SummaryApi.signIn.method,
            withCredentials: true,
            headers: {
                "content-type": "application/json"
            },
            data: data
        })

        const dataApi = await dataResponse.data

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
        }
        if (dataApi.error) {
            toast.error(dataApi.message)
        }
    }


    // LOGIN

    return (
        <section id='login'>
            <div className='mx-auto container p-4 '>

                <div className='bg-[#ffffff] rounded-lg p-5 w-full mx-auto max-w-sm shadow'>
                    <div className='w-full h-20 mx-auto flex items-center justify-center gap-4 shadow rounded-3xl '>
                        <span className='font-bold text-3xl text-pink-700'>Login</span>
                        <img src={login} alt="login" className='w-20  ' />
                    </div>

                    {/* email id and password */}
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2 rounded-md'>
                                <input type="email"
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex rounded-md'>
                                <input type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent ' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prevVal) => !prevVal)}>
                                    <span>
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </span>
                                </div>
                            </div>

                            <Link className='block w-fit ml-auto hover:underline hover:text-red-600 ' to={"/forgot-password"}>
                                Forgot Password ?
                            </Link>

                        </div>

                        <button className='bg-pink-700 text-white w-full px-6 py-2 rounded-md hover:bg-pink-800 mt-6'>Login</button>

                    </form>

                    <p className='my-2'>Dot't have account ?
                        <Link to="/sign-up" className='text-blue-600 hover:text-red-700 hover:underline'> Sign Up</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login
