import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Barchart = () => {
  const { darkMode } = useSelector((state) => state.mode);

  const [chart, setChart] = useState(null);
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/orders/get-seller-orders",
        });

        const orders = response?.data?.data;

        console.log("API Response Orders:", orders);

        if (orders && orders.length > 0) {
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
                borderColor: darkMode ? "black" : "white",
                backgroundColor: darkMode
                  ? "rgba(0, 0, 0, 0.7)"
                  : "rgba(255, 255, 255, 0.71)",
                borderWidth: 1,
              },
            ],
          });
          setIsDataAvailable(true);
        } else {
          setIsDataAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
        setIsDataAvailable(false);
      }
    };
    fetchOrderData();
  }, [darkMode]);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "white" : "black",
        color: darkMode ? "black" : "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div
        className="container d-flex justify-content-start align-items-start heading-head">
        <p style={{ fontSize: "20px", fontWeight: "600" }}>
        SALES ANALYSIS & ORDER STATISTICS
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
        <p
          style={{
            color: darkMode ? "black" : "white",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          No Orders available for you
        </p>
      )}
    </div>
  );
};

export default Barchart;
