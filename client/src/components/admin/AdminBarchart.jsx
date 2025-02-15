import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, } from "chart.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminBarhart = () => {
    const [chart, setChart] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/orders/get-all-orders",
                });

                const orders = response?.data;

                const labels = orders.map((order) =>
                    new Date(order.createdAt).toLocaleDateString()
                );
                const totalAmounts = orders.map((order) => order.totalAmount);

                setChart({
                    labels,
                    datasets: [
                        {
                            label: "Total price of Orders",
                            data: totalAmounts,
                            borderColor: "rgb(0, 0, 0)",
                            backgroundColor: "rgb(0, 0, 0)",
                            borderWidth: 1,
                            fill: false,
                        },
                    ],
                });
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(err.message || "An error occurred while fetching data.");
            }
        };

        fetchOrderData();
    }, []);

    return (
        <div>
            <h1>Sales analyse</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : chart ? (
                <Bar
                    data={chart}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminBarhart;
