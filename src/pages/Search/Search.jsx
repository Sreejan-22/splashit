import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ImageContainer from "../../components/ImageContainer/ImageContainer";

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

export default Search;
