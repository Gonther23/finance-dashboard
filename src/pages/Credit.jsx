import { useState } from "react";
import styles from "./Credit.module.scss";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";



const Credit = () => {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(12);

  const monthlyRate = rate / 100 / 12;

  const monthlyPayment =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - amount;

  const amortization = [];

  let balance = amount;

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    amortization.push({
      month: i,
      payment: monthlyPayment,
      principal,
      interest,
      balance: balance > 0 ? balance : 0,
    });
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(amortization);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Amortización");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "tabla_amortizacion.xlsx");
  };

  const isValid =
    amount >= 500 &&
    amount <= 1000000 &&
    rate >= 1 &&
    rate <= 60 &&
    months >= 1 &&
    months <= 60;

  return (
    <div className={styles.container}>
      <h1>Simulador de Crédito</h1>

      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Monto</label>
          <input
            type="number"
            min={500}
            max={1000000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Tasa anual (%)</label>
          <input
            type="number"
            min={1}
            max={60}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Plazo (meses)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </div>
      </div>

      {isValid && (
        <div className={styles.results}>
          <div className={styles.card}>
            <h3>Pago mensual</h3>
            <p>${monthlyPayment.toFixed(2)}</p>
          </div>

          <div className={styles.card}>
            <h3>Total pagado</h3>
            <p>${totalPayment.toFixed(2)}</p>
          </div>

          <div className={styles.card}>
            <h3>Intereses</h3>
            <p>${totalInterest.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className={styles.bottomSection}>
        <div className={styles.tableWrapper}>
          <h2 className={styles.tableTitle} >Tabla de Amortización</h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mes</th>
                <th>Pago</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {amortization.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>${row.payment.toFixed(2)}</td>
                  <td>${row.principal.toFixed(2)}</td>
                  <td>${row.interest.toFixed(2)}</td>
                  <td>${row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.chartWrapper}>
          <h2>Evolución del Crédito</h2>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={amortization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="principal"
                stroke="#1e3a8a"
                name="Capital"
              />
              <Line
                type="monotone"
                dataKey="interest"
                stroke="#ef4444"
                name="Interés"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button onClick={exportToExcel} className={styles.exportBtn}>
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default Credit;
