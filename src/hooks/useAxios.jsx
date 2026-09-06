import axios from "axios";


const publicAxios = axios.create({
    baseURL: "http://localhost:3000"
})



const useAxios = () => {
    return publicAxios;
};

export default useAxios;