import { useState, useMemo } from "react";
import styles from "./Tarjeta.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Tarjeta() {
  const [deuda, setDeuda] = useState(20000);
  const [tasa, setTasa] = useState(50);
  const [pago, setPago] = useState(1500);

  const resultado = useMemo(() => {
    const r = tasa / 100 / 12;
    let saldo = deuda;
    let mes = 0;
    let totalInteres = 0;
    const tabla = [];
    let pagoInsuficiente = false;

    while (saldo > 0 && mes < 600) {
      const interes = saldo * r;
      const abonoCapital = pago - interes;

      if (abonoCapital <= 0) {
        pagoInsuficiente = true;
        break;
      }

      saldo = saldo + interes - pago;
      totalInteres += interes;
      mes++;

      tabla.push({
        mes,
        saldo: saldo > 0 ? saldo : 0,
        interes,
        pago,
      });
    }

    return {
      meses: mes,
      totalPagado: pago * mes,
      totalInteres,
      tabla,
      pagoInsuficiente,
    };
  }, [deuda, tasa, pago]);

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(valor);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Simulador de Tarjeta de Crédito</h2>

      {/* FORMULARIO */}
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Deuda Inicial</label>
          <input
            type="number"
            value={deuda}
            onChange={(e) => setDeuda(Number(e.target.value))}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Tasa Anual (%)</label>
          <input
            type="number"
            value={tasa}
            onChange={(e) => setTasa(Number(e.target.value))}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Pago Mensual</label>
          <input
            type="number"
            value={pago}
            onChange={(e) => setPago(Number(e.target.value))}
          />
        </div>
      </div>

      {/* ALERTA */}
      {resultado.pagoInsuficiente && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          ⚠ El pago mensual no cubre los intereses. La deuda nunca se liquidará.
        </div>
      )}

      {/* RESULTADOS */}
      <div className={styles.results}>
        <div className={styles.card}>
          <h3>Meses para liquidar</h3>
          <p>{resultado.meses}</p>
        </div>

        <div className={styles.card}>
          <h3>Total pagado</h3>
          <p>{formatoMoneda(resultado.totalPagado)}</p>
        </div>

        <div className={styles.card}>
          <h3>Intereses pagados</h3>
          <p>{formatoMoneda(resultado.totalInteres)}</p>
        </div>
      </div>

      {/* TABLA + GRÁFICA */}
      <div className={styles.bottomSection}>
        {/* TABLA */}
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Amortización Mensual</h3>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Pago</th>
                  <th>Interés</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {resultado.tabla.map((row) => (
                  <tr key={row.mes}>
                    <td>{row.mes}</td>
                    <td>{formatoMoneda(row.pago)}</td>
                    <td>{formatoMoneda(row.interes)}</td>
                    <td>{formatoMoneda(row.saldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GRÁFICA */}
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Evolución del Saldo</h3>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={resultado.tabla}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="saldo"
                stroke="#b91c1c"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Tarjeta;