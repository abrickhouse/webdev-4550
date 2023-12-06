import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const REV_API = `${BASE_API}/api/reviews`;
export const REP_API = `${BASE_API}/api/responses`;

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
export const findAllResponses = async () => {
 const response = await request.get(`${REP_API}`);
 return response.data;
};
export const createResponse = async (rep) => {
 const response = await request.post(`${REP_API}`, rep);
 return response.data;
};
