const EMAIL_REGEX_VALIDATION = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const minPasswordLength = 6;

export const isEmpty = (field) => field.length === 0;

export const validEmail = (anEmail) => EMAIL_REGEX_VALIDATION.test(anEmail);

export const validPassword = (aPassword) =>
    aPassword.length >= minPasswordLength;

export const saveUserDataInLocalStorage = (data) => {
    const { token, loggedUser } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", loggedUser.role);
};

export const removeUserDataFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

export const getUserDataFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return { token, role };
};

export const isAdmin = () => getUserDataFromLocalStorage().role === "ADMIN";

export const headers = () => {
    const token = getUserDataFromLocalStorage().token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const GATEWAY_URL = "gateway";
const GATEWAY_PORT = 3006;
// export const BASE_URL = `http://localhost:${GATEWAY_PORT}/${GATEWAY_URL}`;
export const BASE_URL = `http://CentinelaGateway-env.eba-p8dbiuud.us-east-1.elasticbeanstalk.com/${GATEWAY_URL}`;
export const AUTH_URL = "auth";
export const ERRORS_URL = "errors";
export const NOTIFICATIONS_URL = "notifications";
export const REPORTS_URL = "reports";
export const BILLING_URL = "billing";
