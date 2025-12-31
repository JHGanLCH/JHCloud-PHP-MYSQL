
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import NewsDetail from './pages/NewsDetail';
import ProductDetail from './pages/ProductDetail';
import CaseDetail from './pages/CaseDetail';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin routes don't have standard header/footer */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Standard site routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/case/:id" element={<CaseDetail />} />
                  <Route path="/trial" element={<TrialRedirect />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

const TrialRedirect: React.FC = () => {
  React.useEffect(() => {
    window.location.href = "http://210.12.53.106:97/";
  }, []);
  return <div className="p-20 text-center text-slate-400 font-bold">正在进入嘉禾云网在线体验系统...</div>;
};

export default App;
