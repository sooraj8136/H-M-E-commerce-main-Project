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
