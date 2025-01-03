import axios from "axios";
import SummaryApi from "../common";

const fetchCategoryWiseProduct = async(category) => {
    const response = await axios({
        url: SummaryApi.categoryWiseProduct.url,
        method : SummaryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        data : {
            category : category
        }
    })

    const dataResponse = await response.data

    return dataResponse
}

export default fetchCategoryWiseProduct