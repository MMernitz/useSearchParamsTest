import { Link, Outlet, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

import { useTestStore } from "./store";

export default function Example() {
  const [searchParams, setSearchParams] = useSearchParams({
    q: "test",
    sort: "canonical",
    filters: "",
  });
  const navigate = useNavigate();
  const {
    inputValue,
    sort,
    filters,
    setInputValue,
    setSort,
    setScribes,
    setInstitutes,
    setBooks,
  } = useTestStore(
    (state) => ({
      inputValue: state.inputValue,
      sort: state.sort,
      filters: state.filters,
      setInputValue: state.setInputValue,
      setSort: state.setSort,
      setScribes: state.setScribes,
      setInstitutes: state.setInstitutes,
      setBooks: state.setBooks,
    }),
    shallow,
  );

  useEffect(() => {
    const q = searchParams.get("q"); // Provide a default value if "q" is missing
    const order = searchParams.get("sort"); // Provide a default value if "sort" is missing
    const facetString = decodeURIComponent(searchParams.get("filters"));
    let facets = {};
    try {
      facets = JSON.parse(facetString);
      setInputValue(q);
      setSort(order);
      setScribes(facets.scribes);
      setInstitutes(facets.institutes);
      setBooks(facets.books);
    } catch (error) {
      // Handle invalid JSON or missing parameters gracefully
      console.error("Error parsing filters:", error);
      // Provide default values or handle the error as needed
      setInputValue("test");
      setSort("canonical");
      setScribes([]);
      setInstitutes([]);
      setBooks([]);
    }
  }, [
    searchParams,
    setInputValue,
    setSort,
    setScribes,
    setInstitutes,
    setBooks,
  ]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleButtonClick() {
    setSearchParams({
      q: inputValue,
      sort: sort,
      filters: JSON.stringify(filters),
    });
    console.log("searchParams: ", searchParams.toString());
  }

  return (
    <div>
      <div>
        <h1>Hi from Example page</h1>
        <input value={inputValue} onChange={handleInputChange} />
        {inputValue && <p>This is our input value: {inputValue}</p>}
        {sort && <p>This is the sort value: {sort}</p>}
        {filters && (
          <div>
            <h3>Filters</h3>
            <div>
              <p>All the filters: </p>
              {/* The following mappings are iterating over the filters keys and iterate over the keys values in order to print them*/}
              {/** p may not be a child of p */}
              {Object.keys(filters).map((filter) => (
                <div key={filter}>
                  {filter}:{" "}
                  {filters[filter].map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="button" onClick={handleButtonClick}>
          Click to update the URL
        </button>
      </div>
      <button>
        <Link to="/">To the Homepage</Link>
      </button>
      <Outlet />
    </div>
  );
}
