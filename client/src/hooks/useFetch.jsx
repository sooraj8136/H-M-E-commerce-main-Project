// import { useEffect, useState } from "react";
// import { axiosInstance } from "../config/axiosInstance";

// export const useFetch = (url) => {
//     const [data, setData] = useState();
//     const [error, setError] = useState({});
//     const [isLoading, setLoading] = useState(true);

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance({
//                 method: "GET",
//                 url: url,
//             });
//             console.log("Fetched Data=====", response);
//             setData(response?.data?.data);
//             setTimeout(() => {
//                 setLoading(false);
//             }, 2000);
//         } catch (error) {
//             console.log(error);
//             setError(error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return [data, isLoading, error];
// };



import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [refreshIndex, setRefreshIndex] = useState(0); 

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(url);
            setData(response?.data?.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, refreshIndex]);
    const refreshData = () => setRefreshIndex((prev) => prev + 1);

    return [data, isLoading, error, refreshData];
};
