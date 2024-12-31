import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
    const [data, setData] = useState();
    const [error, setError] = useState({});
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: url,
            });
            console.log("Fetched Data=====", response);
            setData(response?.data?.data);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return [data, isLoading, error];
};