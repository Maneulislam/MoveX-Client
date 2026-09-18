import axios from "axios";


const publicAxios = axios.create({
    baseURL: "https://zap-shift-server-eight-theta.vercel.app/"
})



const useAxios = () => {
    return publicAxios;
};

export default useAxios;