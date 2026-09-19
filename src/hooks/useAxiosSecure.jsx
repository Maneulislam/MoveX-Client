import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";



const instanceAxios = axios.create({
    baseURL: "https://movexpd-server.vercel.app"
})

const useAxiosSecure = () => {

    const navigate = useNavigate();

    const { user, logOut } = useAuth();

    useEffect(() => {
        const reqInterceptor = instanceAxios.interceptors.request.use(config => {

            config.headers.Authorization = `Bearer ${user?.accessToken} `

            return config;
        })


        const resInterceptor = instanceAxios.interceptors.response.use((response) => {
            return response;
        },
            (error) => {
                // console.log(error);

                const statusCode = error.status;
                if (statusCode === 401 || statusCode === 403) {
                    logOut();

                    navigate('/login')

                }


                return Promise.reject(error);
            })


        return () => {
            instanceAxios.interceptors.request.eject(reqInterceptor);
            instanceAxios.interceptors.response.eject(resInterceptor)
        }

    }, [user, logOut, navigate])


    return instanceAxios;

};

export default useAxiosSecure;