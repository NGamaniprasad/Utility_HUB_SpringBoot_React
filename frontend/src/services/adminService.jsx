import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

export const adminLogin = async (adminCode, password) => {
    const response = await axios.post(
        `${API_URL}/login`,
        {
            adminCode,
            password
        }
    );

    return response.data;
};

export const getAdminDashboard = async () => {

    const token = localStorage.getItem("adminToken");

    const response = await axios.get(
        `${API_URL}/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};