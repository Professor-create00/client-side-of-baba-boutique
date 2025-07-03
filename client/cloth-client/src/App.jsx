import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/saree" element={<CategoryPage category="saree" />} />
        <Route path="/salwar-kurti" element={<CategoryPage category="salwar-kurti" />} />
        <Route path="/night-dress" element={<CategoryPage category="night-dress" />} />
        <Route path="/pickle" element={<CategoryPage category="pickle" />} />
        <Route path="/organic-masalas" element={<CategoryPage category="organic-masalas" />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
