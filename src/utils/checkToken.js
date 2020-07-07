import jwtDecode from "jwt-decode";

export default function () {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp > Date.now() / 1000) {
            return {
                isValid: true,
                user: decoded,
            };
        }
        return {
            isValid: false,
        };
    }
    return {
        isValid: false,
    };
}
