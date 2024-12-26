const backendDomain =  "https://lnkart.onrender.com" || "http://localhost:3000" 
// "http://localhost:3000" ||

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
}

export default SummaryApi