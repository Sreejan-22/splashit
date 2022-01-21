import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Filters from "../Filters/Filters";
import { getSearchParams } from "../../utils/getSearchParams";
import unsplash from "../../assets/unsplash.png";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import "./Navbar.css";

const Navbar = ({ showFilters, setShowFilters }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("relevant");
  const [color, setColor] = useState("any_color");
  const [orientation, setOrientation] = useState("any");

  useEffect(() => {
    if (location.pathname.includes("/search")) {
      setInput(searchParams.get("query"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function search(e) {
    if (e) e.preventDefault();
    if (input.length > 0) {
      const searchQueryParams = getSearchParams(
        input,
        sortBy,
        color,
        orientation
      );
      navigate(`/search?${searchQueryParams}`);
    }
  }

  useEffect(() => {
    search();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, color, orientation]);

  const isSortBySelected = (val) => {
    return sortBy === val;
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const isColorSelected = (val) => {
    return color === val;
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const isOrientationSelected = (val) => {
    return orientation === val;
  };

  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
  };

  const clearFilters = () => {
    setSortBy("relevant");
    setColor("any_color");
    setOrientation("any");
    setShowFilters(false);
  };

  return (
    <div className="navbar-wrapper">
      <nav className={`navbar ${location.pathname === "/" ? "navbar-sm" : ""}`}>
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <img src={unsplash} alt="" className="nav-img" />
          <div className="brand-name">Splashit</div>
        </div>
        <form className="nav-search-wrapper" onSubmit={search}>
          <input
            type="text"
            placeholder="Search"
            className="nav-search-bar"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <SearchIcon
            width="24px"
            height="24px"
            className="nav-search-icon"
            color="rgb(85, 85, 85)"
          />
        </form>
        {location.pathname.includes("/search") ? (
          <div className="nav-last-div">
            <button
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="filter-btn-text">Filters</span>{" "}
              <FilterIcon
                className="filter-btn-icon"
                height="24px"
                width="24px"
              />
            </button>
          </div>
        ) : null}
      </nav>
      {showFilters ? (
        <Filters
          isSortBySelected={isSortBySelected}
          handleSortByChange={handleSortByChange}
          isColorSelected={isColorSelected}
          handleColorChange={handleColorChange}
          isOrientationSelected={isOrientationSelected}
          handleOrientationChange={handleOrientationChange}
          clearFilters={clearFilters}
        />
      ) : null}
    </div>
  );
};

export default Navbar;
