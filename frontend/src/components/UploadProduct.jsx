import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { productCategory } from '../helpers/productCategory';
import { MdCloudUpload, MdPhotoCamera, MdUpload, MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';

const UploadProduct = ({ onClose, fetchData }) => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const [fullScreenImage, setFullScreenImage] = useState("")
    const [openFullScreenImg, setOpenFullScreenImg] = useState(false)

    const handleOnChange = (e) => {

    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]


        const uploadImageCloudinary = await uploadImage(file)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }

        })

    }
    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }

        })
    }

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg w-full max-w-2xl h-full max-h-[80%] overflow-hidden shadow-xl relative'>

                {/* Header */}
                <div className='flex justify-between items-center pb-4 border-b'>
                    <h2 className='font-bold text-xl flex items-center gap-2'>
                        <MdCloudUpload className='text-red-600' /> Upload Product
                    </h2>
                    <div
                        className='w-fit ml-auto text-3xl text-gray-600 hover:text-red-600 cursor-pointer transition-all'
                        onClick={onClose}
                    >
                        <CgClose />
                    </div>
                </div>

                {/* Form */}
                <form className='grid p-4 gap-4 overflow-y-scroll h-full pb-10'>

                    {/* Product Name */}
                    <div>
                        <label htmlFor='productName' className='block font-medium'>Product Name :</label>
                        <input
                            type='text'
                            id='productName'
                            placeholder='Enter product name'
                            name='productName'
                            value={data?.productName || ""}
                            onChange={handleOnChange}
                            className='p-3 bg-gray-100 border rounded-lg w-full focus:ring focus:ring-blue-300'
                            required
                        />
                    </div>

                    {/* Brand Name */}
                    <div>
                        <label htmlFor='brandName' className='block font-medium'>Brand Name :</label>
                        <input
                            type='text'
                            id='brandName'
                            placeholder='Enter brand name'
                            name='brandName'
                            value={data?.brandName || ""}
                            onChange={handleOnChange}
                            className='p-3 bg-gray-100 border rounded-lg w-full focus:ring focus:ring-blue-300'
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor='category' className='block font-medium'>Category :</label>
                        <select
                            required
                            name='category'
                            value={data?.category || ""}
                            onChange={handleOnChange}
                            className='p-3 bg-gray-100 border rounded-lg w-full focus:ring focus:ring-blue-300'
                        >
                            <option value="">Select Category</option>
                            {productCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>{el.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Product Image */}
                    <div>
                        <label htmlFor='productImage' className='block font-medium'>Product Image :</label>
                        <label htmlFor='uploadImageInput'>
                            <div className='p-4 bg-gray-100 border rounded-lg h-40 w-full flex justify-center items-center cursor-pointer hover:bg-gray-200'>
                                <div className='text-gray-600 flex flex-col items-center gap-2'>
                                    <MdPhotoCamera className='text-5xl' />
                                    <p className='text-sm font-medium'>Upload Product Image</p>
                                    <input
                                        type='file'
                                        id='uploadImageInput'
                                        className='hidden'
                                        onChange={handleUploadProduct}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Uploaded Product Image */}
                    <div className='mt-4'>
                        {data?.productImage[0] ? (
                            <div className='flex items-center gap-4 flex-wrap'>
                                {data.productImage.map((el, index) => (
                                    <div key={index} className='relative group'>
                                        {/* Image Display */}
                                        <img
                                            src={el}
                                            alt={`Product Image ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className='bg-gray-100 border rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all'
                                            onClick={() => {
                                                setOpenFullScreenImg(true)
                                                setFullScreenImage(el)
                                            }}
                                        />
                                        {/* Delete Icon */}
                                        <div
                                            className='absolute bottom-1 right-1 p-1 text-white bg-red-700 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer transition-all'
                                            onClick={() => handleDeleteProductImage(index)}
                                        >
                                            <MdDelete className='text-lg' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs italic'>*Please upload at least one product image</p>
                        )}
                    </div>


                    {/* Product Price */}
                    <div>
                        <label htmlFor='price' className='block font-medium'>Price :</label>
                        <input
                            type='number'
                            id='price'
                            placeholder='Enter price'
                            name='price'
                            value={data?.price || ""}
                            onChange={handleOnChange}
                            className='p-3 bg-gray-100 border rounded-lg w-full focus:ring focus:ring-blue-300'
                            required
                        />
                    </div>

                    {/* Selling Price */}
                    <div>
                        <label htmlFor='sellingPrice' className='block font-medium'>Selling Price :</label>
                        <input
                            type='number'
                            id='sellingPrice'
                            placeholder='Enter selling price'
                            name='sellingPrice'
                            value={data?.sellingPrice || ""}
                            onChange={handleOnChange}
                            className='p-3 bg-gray-100 border rounded-lg w-full focus:ring focus:ring-blue-300'
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor='description' className='block font-medium'>Description :</label>
                        <textarea
                            className='h-28 bg-gray-100 border rounded-lg p-3 resize-none focus:ring focus:ring-blue-300'
                            placeholder='Enter product description'
                            rows={3}
                            onChange={handleOnChange}
                            name='description'
                            value={data?.description || ""}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className='px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all mt-4'
                    >
                        <MdUpload className='inline-block mr-2' /> Upload Product
                    </button>
                </form>

            </div>


            {/* display image full screen */}

            {
                openFullScreenImg && (
                    <DisplayImage onClose={() => setOpenFullScreenImg(false)} imgUrl={fullScreenImage} />

                )
            }
        </div>

    )
}

export default UploadProduct