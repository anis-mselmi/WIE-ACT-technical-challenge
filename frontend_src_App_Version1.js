import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import RideList from "./pages/RideList";
import AddRide from "./pages/AddRide";
import ForumHome from "./pages/ForumHome";
import PostList from "./pages/PostList";
import SinglePost from "./pages/SinglePost";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/rides" element={<RideList />} />
        <Route path="/add-ride" element={<AddRide />} />
        <Route path="/forum" element={<ForumHome />} />
        <Route path="/forum/category/:category" element={<PostList />} />
        <Route path="/forum/:id" element={<SinglePost />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;