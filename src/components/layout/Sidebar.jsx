import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>FinTech</h2>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/credit">Crédito</NavLink>
        <NavLink to="/mortgage">Hipotecario</NavLink>
        <NavLink to="/investment">Inversión</NavLink>
        <NavLink to="/credit-card">Tarjeta</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;