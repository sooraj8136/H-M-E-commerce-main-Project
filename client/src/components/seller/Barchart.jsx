import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Barchart = () => {
   
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/orders/get-seller-orders",
                });

                const orders = response?.data?.data;

                console.log("API Response Orders:", orders);

                // Extract labels and data
                const labels = orders.map((order) =>
                    new Date(order?.createdAt).toLocaleDateString()
                );

                const totalAmounts = orders.map((order) => order?.totalAmount);

                console.log("Labels:", labels);
                console.log("Total Amounts:", totalAmounts);

                setChart({
                    labels,
                    datasets: [
                        {
                            label: "Total price of Orders",
                            data: totalAmounts,
                            borderColor: "rgb(0, 0, 0)",
                            backgroundColor: "rgb(2, 0, 0)",
                            borderWidth: 1,
                            fill: false,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };
        fetchOrderData();
    }, []);

    return (
        <div>
            <h1>Sales analyse & Order Statistics</h1>
            {chart ? <Bar data={chart} options={{ responsive: true }} /> : <p>Loading...</p>}
        </div>
    );
};

export default Barchart;
