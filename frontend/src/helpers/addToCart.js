import axios from "axios"
import SummaryApi from "../common"
import { toast } from 'react-toastify'


const addToCart = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await axios({
        url: SummaryApi.addToCart.url,
        method: SummaryApi.addToCart.method,
        withCredentials: true,
        headers: {
            "content-type": "application/json"
        },
        data: {
            productId: id
        }
    })

    const responseData = await response.data
    
    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.warning(responseData.message)
    } 

    return responseData
}

export default addToCart