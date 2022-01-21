import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "react-loader-spinner";
const Images = lazy(() =>
  import("../../components/ImageContainer/ImageContainer")
);

const Search = () => {
  const { pathname, search } = useLocation();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <>
      <Navbar showFilters={showFilters} setShowFilters={setShowFilters} />
      <Suspense
        fallback={
          <Loader
            type="Oval"
            color="#3f3f3f"
            height={50}
            width={50}
            style={{ textAlign: "center" }}
          />
        }
      >
        <Images showFilters={showFilters} />
      </Suspense>
    </>
  );
};

export default Search;
