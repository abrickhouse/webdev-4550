import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const REV_API = `${BASE_API}/api/reviews`;

const request = axios.create({
 withCredentials: true,
});

export const findAllReviews = async () => {
 const response = await request.get(`${REV_API}`);
 return response.data;
};
export const createReview = async (rev) => {
 const response = await request.post(`${REV_API}`, rev);
 return response.data;
};
