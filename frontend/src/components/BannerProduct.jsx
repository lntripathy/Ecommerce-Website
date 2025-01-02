import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img5.webp'

import image1Mobile from '../assets/banner/img1_mobile.jpg'
import image2Mobile from '../assets/banner/img2_mobile.webp'
import image3Mobile from '../assets/banner/img3_mobile.jpg'
import image4Mobile from '../assets/banner/img4_mobile.jpg'
import image5Mobile from '../assets/banner/img5_mobile.png'


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(1)

    const desktopImages = [image1, image2, image3, image4, image5]
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
        else {
            setCurrentImage(0)
        }
    }

    const preveImage = () => {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)
        }
        else {
            setCurrentImage(desktopImages.length - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            }
            else {
                setCurrentImage(0)
            }
        }, 3400)
        return () => clearInterval(interval)
            setCurrentImage(0)
    },[currentImage])

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-56 md:h-72 w-full bg-slate-200 relative rounded-lg overflow-hidden shadow-lg'>

                {/* Navigation Buttons for Desktop/Tablet */}
                <div className='absolute z-10 h-full w-full md:flex items-center justify-between hidden px-4'>
                    <button
                        onClick={preveImage}
                        className='bg-white shadow-md rounded-full p-2 hover:bg-gray-200 transition-all'
                    >
                        <FaAngleLeft className='text-2xl text-gray-700' />
                    </button>
                    <button
                        onClick={nextImage}
                        className='bg-white shadow-md rounded-full p-2 hover:bg-gray-200 transition-all'
                    >
                        <FaAngleRight className='text-2xl text-gray-700' />
                    </button>
                </div>

                {/* Desktop and Tablet Version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {desktopImages.map((imageURL, index) => (
                        <div
                            className='w-full h-full min-w-full transition-transform duration-500 ease-in-out'
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                src={imageURL}
                                className='w-full h-full object-cover'
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageURL, index) => (
                        <div
                            className='w-full h-full min-w-full transition-transform duration-500 ease-in-out'
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img
                                src={imageURL}
                                className='w-full h-full object-cover'
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default BannerProduct
