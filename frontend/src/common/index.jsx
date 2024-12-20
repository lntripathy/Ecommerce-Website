const backendDomain = "http://localhost:3000"

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
}

export default SummaryApi