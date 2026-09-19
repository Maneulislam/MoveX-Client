import axios from "axios";


const publicAxios = axios.create({
    baseURL: "https://movexpd-server.vercel.app"
})



const useAxios = () => {
    return publicAxios;
};

export default useAxios;