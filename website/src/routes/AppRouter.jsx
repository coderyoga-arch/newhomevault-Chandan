import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Property from "../pages/properties/Property";
import Services from "../pages/services/Services";
import Contact from "../pages/contact/Contact";
import PropertyDetail from "../pages/property-detail/PropertyDetail";
import PrivacyPolicy from "../pages/privacy-policy/PrivacyPolicy";
import TermsConditions from "../pages/terms-conditions/TermsConditions";
import ScrollToTop from "../components/common/ScrollToTop";

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/property" element={<Property />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property-detail" element={<PropertyDetail />} />
          <Route path="/property-detail/:name" element={<PropertyDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Route>
      </Routes>
    </>
  );
}
