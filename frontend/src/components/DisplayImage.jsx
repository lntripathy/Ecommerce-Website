import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white shadow-xl rounded-lg max-w-5xl mx-auto p-7 relative'>
                {/* Close Button */}
                <div
                    className='absolute top-1 right-1 text-gray-800 hover:text-red-700 text-3xl cursor-pointer transition-transform transform'
                    onClick={onClose}
                >
                    <CgClose />
                </div>

                {/* Image Container */}
                <div className='flex justify-center items-center overflow-hidden max-w-[80vw] max-h-[80vh] border rounded-md'>
                    <img
                        src={imgUrl}
                        className='w-full h-auto max-h-[80vh] rounded-md shadow-md object-contain'
                        alt='Full Screen Preview'
                    />
                </div>
            </div>
        </div>

    )
}

export default DisplayImage