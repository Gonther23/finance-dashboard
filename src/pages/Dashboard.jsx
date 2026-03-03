import React from "react";
import styles from "./Dashboard.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const summary = {
    totalInvertido: 85000,
    totalIntereses: 12000,
    totalCreditos: 3,
    balanceNeto: 43000,
  };

  const chartData = [
    { name: "Ene", inversion: 50000, deuda: 40000 },
    { name: "Feb", inversion: 60000, deuda: 35000 },
    { name: "Mar", inversion: 70000, deuda: 25000 },
    { name: "Abr", inversion: 80000, deuda: 15000 },
    { name: "May", inversion: 85000, deuda: 5000 },
  ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <h3>Total invertido</h3>
          <p>${summary.totalInvertido.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h3>Intereses generados</h3>
          <p>${summary.totalIntereses.toLocaleString()}</p>
        </div>

        <div className={styles.card}>
          <h3>Créditos activos</h3>
          <p>{summary.totalCreditos}</p>
        </div>

        <div className={styles.card}>
          <h3>Balance neto</h3>
          <p>${summary.balanceNeto.toLocaleString()}</p>
        </div>
      </div>

      <div className={styles.mainSection}>
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>
            Comparativa Inversión vs Deuda
          </h3>

          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="inversion"
                  stroke="#2c3e91"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="deuda"
                  stroke="#e74c3c"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;