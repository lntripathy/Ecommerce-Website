import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
// import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchData }) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded shadow-lg hover:shadow-xl transition-all'>
            {/* Product Image Section */}
            <div className='w-40 mx-auto'>
                <div className='w-32 h-32 flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-100 mx-auto'>
                    <img
                        src={data?.productImage[0]}
                        className='object-contain h-full w-full'
                        alt={data?.productName || "Product Image"}
                    />
                </div>
            </div>

            {/* Product Details Section */}
            <div className='mt-4 text-center w-40'>
                <h1 className='text-gray-800 font-semibold text-sm  text-ellipsis line-clamp-2'>
                    {data.productName}
                </h1>
                <p className='mt-2 text-green-600 font-bold text-lg'>
                    {
                        displayINRCurrency(data.sellingPrice)
                    }
                </p>
            </div>

            {/* Edit Button */}
            <div className='flex justify-end mt-4'>
                <div
                    className='w-fit p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer transition-all'
                    onClick={() => setEditProduct(true)}
                >
                    <FaEdit className='text-lg' />

                </div>
            </div>

            {/* Edit Product Modal */}
            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchData={fetchData}
                />
            )}
        </div>


    )
}

export default AdminProductCard