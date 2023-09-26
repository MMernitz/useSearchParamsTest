import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

import { useTestStore } from "./store";

export default function Example() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    q: "test",
    sort: "canonical",
    filters: "",
  });
  const {
    inputValue,
    sort,
    scribes,
    institutes,
    books,
    filters,
    selectedScribes,
    selectedInstitutes,
    selectedBooks,
    setInputValue,
    setSort,
    setScribes,
    setInstitutes,
    setBooks,
    setSelectedScribes,
    setSelectedInstitutes,
    setSelectedBooks,
  } = useTestStore(
    (state) => ({
      inputValue: state.inputValue,
      sort: state.sort,
      scribes: state.scribes,
      institutes: state.institutes,
      books: state.books,
      filters: state.filters,
      selectedScribes: state.selectedScribes,
      selectedInstitutes: state.selectedInstitutes,
      selectedBooks: state.selectedBooks,
      setInputValue: state.setInputValue,
      setSort: state.setSort,
      setScribes: state.setScribes,
      setInstitutes: state.setInstitutes,
      setBooks: state.setBooks,
      setSelectedScribes: state.setSelectedScribes,
      setSelectedInstitutes: state.setSelectedInstitutes,
      setSelectedBooks: state.setSelectedBooks,
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
      setSelectedInstitutes(facets.institutes);
      setSelectedBooks(facets.books);
      setSelectedScribes(facets.scribes);
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

  useEffect(() => {
    console.log("selectedScribes: ", selectedScribes);
    console.log("selectedInstitutes: ", selectedInstitutes);
    console.log("selectedBooks: ", selectedBooks);
    console.log("searchParams: ", searchParams.toString());
  }, [selectedScribes, selectedInstitutes, selectedBooks, searchParams]);

  useEffect(() => {
    if (buttonClicked) {
      setSearchParams({
        q: inputValue,
        sort: sort,
        filters: JSON.stringify(filters),
      });
      setButtonClicked(false);
    }
  }, [buttonClicked]);
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleButtonClick() {
    setScribes(selectedScribes);
    setInstitutes(selectedInstitutes);
    setBooks(selectedBooks);
    setButtonClicked(true);
  }

  function handleCheckBoxClick(id, filterType) {
    if (filterType === "scribes") {
      if (selectedScribes.includes(id)) {
        setSelectedScribes(selectedScribes.filter((item) => item !== id));
      } else {
        setSelectedScribes([...selectedScribes, id]);
      }
    } else if (filterType === "institutes") {
      if (selectedInstitutes.includes(id)) {
        setSelectedInstitutes(selectedInstitutes.filter((item) => item !== id));
      } else {
        setSelectedInstitutes([...selectedInstitutes, id]);
      }
    } else if (filterType === "books") {
      if (selectedBooks.includes(id)) {
        setSelectedBooks(selectedBooks.filter((item) => item !== id));
      } else {
        setSelectedBooks([...selectedBooks, id]);
      }
    }
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
              <div>
                scribes:
                {scribes.map((scribe) => (
                  <label key={scribe}>
                    {scribe}
                    <input
                      type="checkbox"
                      checked={selectedScribes.includes(scribe) ? true : false}
                      onChange={() => handleCheckBoxClick(scribe, "scribes")}
                    />{" "}
                  </label>
                ))}
              </div>
              <div>
                institutes:
                {institutes.map((institute) => (
                  <label key={institute}>
                    {institute}
                    <input
                      type="checkbox"
                      checked={
                        selectedInstitutes.includes(institute) ? true : false
                      }
                      onChange={() =>
                        handleCheckBoxClick(institute, "institutes")
                      }
                    />
                  </label>
                ))}
              </div>
              <div>
                books:
                {books.map((book) => (
                  <label key={book}>
                    {book}
                    <input
                      type="checkbox"
                      checked={selectedBooks.includes(book) ? true : false}
                      onChange={() => handleCheckBoxClick(book, "books")}
                    />
                  </label>
                ))}
              </div>
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
