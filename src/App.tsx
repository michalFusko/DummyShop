import { BrowserRouter, Route, Routes } from "react-router";
import CustomerServices from "./components/pages/customer-services/CustomerServices";
import Footer from "./components/footer/Footer";
import HomePage from "./components/pages/home/HomePage";
import AddProductModal from "./components/modals/AddProductModal";
import Nav from "./components/nav/Nav";
import ProductPage from "./components/pages/product/ProductPage";
import ShopPage from "./components/pages/shop/ShopPage";
import PrivacyPolicy from "./components/pages/customer-services/PrivacyPolicy";
import ReturnPolicy from "./components/pages/customer-services/ReturnPolicy";
import TermsOfService from "./components/pages/customer-services/TermsOfService";
import ShippingPolicy from "./components/pages/customer-services/ShippingPolicy";
import ScrollToTop from "./components/common/ScrollToTop";
import { useState } from "react";
import SearchPage from "./components/pages/search/SearchPage";
import LoginPage from "./components/pages/user/LoginPage";
import ProfilePage from "./components/pages/user/ProfilePage";
import RegisterPage from "./components/pages/user/RegisterPage";
import CartModal from "./components/modals/CartModal";
import MobileMenu from "./components/modals/MobileMenu";
import ContactUs from "./components/pages/customer-services/ContactUs";
import AboutPage from "./components/pages/about/AboutPage";

const App = () => {
  // for handling style related logic
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [scrollY, setScrollY] = useState<number>(0);

  return (
    // about page zrobit

    <BrowserRouter>
      <ScrollToTop />
      <Nav windowHeight={windowHeight} />
      <MobileMenu />
      <CartModal />
      <AddProductModal />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              windowHeight={windowHeight}
              setWindowHeight={setWindowHeight}
              scrollY={scrollY}
              setScrollY={setScrollY}
            />
          }
        />
        <Route path="/shop/:categoryPath?/:page?" element={<ShopPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/search/:searchTerm?/:page?" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/customer-services" element={<CustomerServices />}>
          <Route
            path="/customer-services/privacy-policy"
            element={<PrivacyPolicy />}
          />
          <Route
            path="/customer-services/return-policy"
            element={<ReturnPolicy />}
          />
          <Route
            path="/customer-services/terms-of-service"
            element={<TermsOfService />}
          />
          <Route
            path="/customer-services/shipping-policy"
            element={<ShippingPolicy />}
          />
          <Route path="/customer-services/contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
