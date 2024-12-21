import React, { useState } from 'react'
import signup from '../assets/signup.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import ImageTobase64 from '../helpers/ImageTobase64';
import axios from 'axios';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';

const SignUp = () => {

  // hide and show password
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  })

  const navigate = useNavigate()  // for navigation

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value // for both email and password and usernane also so [name]
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await ImageTobase64(file)
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic     // only for profile pic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // confirm password
    if (data.password === data.confirmPassword) {

      const dataResponse = await axios(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        data: data
      })
      const dataApi = await dataResponse.data

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Please confirm correct password.")
    }

  }



  // SIGN UP 

  return (
    <section id='signup'>
      <div className='mx-auto container p-4 '>

        <div className='bg-[#ffffff] rounded-lg p-5 w-full mx-auto max-w-sm shadow'>
          <div className='w-full h-24 mx-auto flex items-center justify-around gap-4 shadow rounded-3xl '>
            <span className='font-bold text-3xl text-pink-700'>SignUp</span>

            {/* upload picture */}
            <div className='relative overflow-hidden rounded-full'>
              <img src={data.profilePic || signup} alt="login" className='w-20 h-20 rounded-full object-fill' />
              <form >
                <label>
                  <div className='text-[9px] bg-[#94ffcbb5] text-center py-2 absolute bottom-0 w-full font-semibold'>
                    Upload Photo
                  </div>
                  <input type="file" className='hidden' onChange={handleUploadPic} />
                </label>

              </form>
            </div>

          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            {/* username */}
            <div className='grid'>
              <label>Username : </label>
              <div className='bg-slate-100 p-2 rounded-md'>
                <input type="text"
                  placeholder='enter username'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            {/* email */}
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

            {/* password */}
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
            </div>

            {/* confirm password */}
            <div>
              <label>Confirm Password : </label>
              <div className='bg-slate-100 p-2 flex rounded-md'>
                <input type={showConfirmPassword ? "text" : "password"}
                  placeholder='confirm password'
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent ' />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prevVal) => !prevVal)}>
                  <span>
                    {
                      showConfirmPassword ? <FaEye /> : <FaEyeSlash />
                    }
                  </span>
                </div>
              </div>
            </div>



            <button className='bg-pink-700 text-white w-full px-6 py-2 rounded-md hover:bg-pink-800 mt-6'>Sign Up</button>

          </form>

          <p className='my-2'>Already have an account ?
            <Link to="/login" className='text-blue-600 hover:text-red-700 hover:underline'> Login</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
