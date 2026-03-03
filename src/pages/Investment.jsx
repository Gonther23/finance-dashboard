import { useState, useMemo } from "react";
import styles from "./Inversion.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "./../context/FinanceContext";



function Inversion() {
  const [monto, setMonto] = useState(10000);
  const [tasa, setTasa] = useState(10);
  const [plazo, setPlazo] = useState(5);
  const [aportacion, setAportacion] = useState(0);

  const resultado = useMemo(() => {
    const r = tasa / 100;
const n = 12;
const crecimiento = [];

for (let year = 1; year <= plazo; year++) {
  const meses = year * 12;
  const factor = Math.pow(1 + r / n, meses);

  const valor =
    monto * factor +
    aportacion * ((factor - 1) / (r / n));

  crecimiento.push({
    año: year,
    valor,
    ganancia: valor - (monto + aportacion * meses),
  });
}

const valorFinal =
  crecimiento.length > 0
    ? crecimiento[crecimiento.length - 1].valor
    : 0;

return {
  valorFinal,
  ganancia:
    valorFinal - (monto + aportacion * plazo * 12),
  crecimiento,
};
  }, [monto, tasa, plazo, aportacion]);

  const formatoMoneda = (valor) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(valor);



  const Inversion = () => {
  const { inversiones, setInversiones } = useFinance();

  const guardarInversion = (nuevaInversion) => {
    setInversiones([...inversiones, nuevaInversion]);
  };
};



  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Simulador de Inversión</h2>

      {/* FORMULARIO */}
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Monto Inicial</label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
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
          <label>Plazo (años)</label>
          <input
            type="number"
            value={plazo}
            onChange={(e) => setPlazo(Number(e.target.value))}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Aportación Mensual</label>
          <input
            type="number"
            value={aportacion}
            onChange={(e) => setAportacion(Number(e.target.value))}
          />
        </div>
      </div>

      {/* RESULTADOS */}
      <div className={styles.results}>
        <div className={styles.card}>
          <h3>Valor Final</h3>
          <p>{formatoMoneda(resultado.valorFinal)}</p>
        </div>

        <div className={styles.card}>
          <h3>Ganancia Generada</h3>
          <p>{formatoMoneda(resultado.ganancia)}</p>
        </div>

        <div className={styles.card}>
          <h3>Total Invertido</h3>
          <p>{formatoMoneda(monto)}</p>
        </div>
      </div>
      <div className={styles.bottomSection}>
        {/* TABLA */}
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Crecimiento Anual</h3>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Año</th>
                  <th>Valor acumulado</th>
                  <th>Ganancia</th>
                </tr>
              </thead>
              <tbody>
                {resultado.crecimiento.map((row) => (
                  <tr key={row.año}>
                    <td>{row.año}</td>
                    <td>{formatoMoneda(row.valor)}</td>
                    <td>{formatoMoneda(row.ganancia)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* GRÁFICA */}
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Evolución de la Inversión</h3>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={resultado.crecimiento}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="año" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#2c3e91"
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

export default Inversion;
