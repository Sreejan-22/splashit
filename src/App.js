import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ImageContainer from "./components/ImageContainer/ImageContainer";

const Home = () => {
  return (
    <>
      <Navbar />
      <ImageContainer />
    </>
  );
};

const Search = () => {
  const { pathname, search } = useLocation();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <>
      <Navbar showFilters={showFilters} setShowFilters={setShowFilters} />
      <ImageContainer showFilters={showFilters} />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
