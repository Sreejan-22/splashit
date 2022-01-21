import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { getSearchParams } from "../../utils/getSearchParams";
import unsplash from "../../assets/unsplash.png";
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
      <nav className="navbar">
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
          <i className="eos-icons nav-search-icon" onClick={search}>
            search
          </i>
        </form>
        {location.pathname.includes("/search") ? (
          <div className="nav-last-div">
            <button className="filter-btn" onClick={() => setShowFilters(true)}>
              <span className="filter-btn-text">Filters</span>{" "}
              <i className="eos-icons filter-btn-icon">filter_alt</i>
            </button>
          </div>
        ) : null}
      </nav>
      {showFilters ? (
        <div className="filter-container">
          <form className="sort-by filter-category">
            <p>SORT BY</p>
            <br />
            <input
              type="radio"
              id="relevant"
              name="relevant"
              value="relevant"
              checked={isSortBySelected("relevant")}
              onChange={handleSortByChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="relevant">Relevance</label>
            <br></br>
            <input
              type="radio"
              id="latest"
              name="latest"
              value="latest"
              checked={isSortBySelected("latest")}
              onChange={handleSortByChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="latest">Newest</label>
            <br></br>
          </form>
          <form className="color-filter filter-category">
            <p>COLOR</p>
            <br />
            <input
              type="radio"
              id="any_color"
              name="any_color"
              value="any_color"
              checked={isColorSelected("any_color")}
              onChange={handleColorChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="any_color">Any Color</label>
            <br></br>
            <input
              type="radio"
              id="black_and_white"
              name="black_and_white"
              value="black_and_white"
              checked={isColorSelected("black_and_white")}
              onChange={handleColorChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="black_and_white">Black and White</label>
            <br></br>
          </form>
          <form className="orientation filter-category">
            <p>ORIENTATION</p>
            <br />
            <input
              type="radio"
              id="any"
              name="any"
              value="any"
              checked={isOrientationSelected("any")}
              onChange={handleOrientationChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="any">Any</label>
            &nbsp;&nbsp;
            <input
              type="radio"
              id="portrait"
              name="portrait"
              value="portrait"
              checked={isOrientationSelected("portrait")}
              onChange={handleOrientationChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="portrait">Portrait</label>
            <br></br>
            <input
              type="radio"
              id="landscape"
              name="landscape"
              value="landscape"
              checked={isOrientationSelected("landscape")}
              onChange={handleOrientationChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="landscape">Landscape</label>
            &nbsp;&nbsp;
            <input
              type="radio"
              id="squarish"
              name="squarish"
              value="squarish"
              checked={isOrientationSelected("squarish")}
              onChange={handleOrientationChange}
            />
            &nbsp;&nbsp;
            <label htmlFor="squarish">Square</label>
          </form>
          <div className="clear-filters-container">
            <button className="clear-filters-btn" onClick={clearFilters}>
              CLEAR FILTERS
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
