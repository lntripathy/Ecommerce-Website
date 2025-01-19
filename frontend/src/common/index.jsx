const backendDomain =  import.meta.env.VITE_NAME_BackEnd_URL
// "http://localhost:3000" || "https://lnkart.onrender.com"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/logout`,
        method: "get"
    },
    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCart: {
        url: `${backendDomain}/api/add-to-cart`,
        method: "post"
    },
    countCartProduct: {
        url: `${backendDomain}/api/count-cart-product`,
        method: "get"
    },
    cartView: {
        url: `${backendDomain}/api/view-cart`,
        method: "get"
    },
    updateCartCount: {
        url: `${backendDomain}/api/update-cart-count`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },
}

export default SummaryApi
