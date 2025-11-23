const { default: axios } = require("axios");

const AxiosPublic = axios.create({
  baseURL: "https://mamarhat-s.vercel.app/",
});

const useAxiosPublic = () => {
  return AxiosPublic;
};
export default useAxiosPublic;
