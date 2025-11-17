const { default: axios } = require("axios");

const AxiosPublic = axios.create({
  baseURL: "http://localhost:4000/",
});

const useAxiosPublic = () => {
  return AxiosPublic;
};
export default useAxiosPublic;
