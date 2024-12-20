import React, { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import SummaryApi from './common';


function App() {

  const fetchUserDetails = async () => {
    const dataResponse = await axios(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      withCredentials: true,
    })

    const dataApi = await dataResponse.data

    console.log("user-data", dataApi)
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <>
      <Context.Provider value={{
          fetchUserDetails
        }}>
        <ToastContainer />
        
        <Header />
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
