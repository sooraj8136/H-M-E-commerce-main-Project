import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminBarhart = () => {
    const { darkMode } = useSelector((state) => state.mode);

    const [chart, setChart] = useState(null);
    const [isDataAvailable, setIsDataAvailable] = useState(true);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/orders/get-all-orders",
                });

                const orders = response?.data;

                if (orders && orders.length > 0) {
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
                                borderColor: darkMode ? "black" : "white",
                                backgroundColor: darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
                                borderWidth: 1,
                            },
                        ],
                    });
                    setIsDataAvailable(true);
                } else {
                    setIsDataAvailable(false);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                setIsDataAvailable(false);
            }
        };

        fetchOrderData();
    }, [darkMode]);

    return (
        <Container
            style={{
                backgroundColor: darkMode ? "white" : "black",
                color: darkMode ? "black" : "white",
                padding: "20px",
                borderRadius: "10px",
            }}
        >
            <div
                className="container d-flex justify-content-start align-items-start heading-head"
                style={{ marginTop: "50px" }}>
                <p className="navlink-font" style={{ fontSize: "40px", fontWeight: "600" }}>
                Admin Data Insights: Monthly Trends
                </p>
            </div>
            {isDataAvailable ? (
                chart ? (
                    <Bar
                        data={chart}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: darkMode ? "black" : "white",
                                    },
                                },
                                title: {
                                    display: true,
                                    text: "Order Data",
                                    color: darkMode ? "black" : "white",
                                },
                                tooltip: {
                                    backgroundColor: darkMode ? "black" : "white",
                                    titleColor: darkMode ? "white" : "black",
                                    bodyColor: darkMode ? "white" : "black",
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: darkMode ? "black" : "white",
                                    },
                                    grid: {
                                        color: darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)",
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: darkMode ? "black" : "white",
                                    },
                                    grid: {
                                        color: darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)",
                                    },
                                },
                            },
                        }}
                    />
                ) : null
            ) : (
                <p style={{ color: darkMode ? "black" : "white", textAlign: "center", fontSize: "18px" }}>
                    No Orders available
                </p>
            )}
        </Container>
    );
};

export default AdminBarhart;
