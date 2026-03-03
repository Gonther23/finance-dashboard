import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Credit from "./pages/Credit";
import Mortgage from "./pages/Mortgage";
import Investment from "./pages/Investment";
import CreditCard from "./pages/CreditCard";
import { FinanceProvider } from "./context/FinanceContext";

function App() {
  return (
    <FinanceProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="credit" element={<Credit />} />
        <Route path="mortgage" element={<Mortgage />} />
        <Route path="investment" element={<Investment />} />
        <Route path="credit-card" element={<CreditCard />} />
      </Route>
    </Routes>
    </FinanceProvider>
  );
}

export default App;