import { NavLink, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

import { useTestStore } from "./store";

export default function Example() {
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    sort: "canonical"
  });
  const { inputValue, sort, setInputValue, setSort } = useTestStore(
    (state) => ({
      inputValue: state.inputValue,
      sort: state.sort,
      setInputValue: state.setInputValue,
      setSort: state.setSort
    }),
    shallow
  );

  const q = searchParams.get("q");
  const order = searchParams.get("sort");

  useEffect(() => {
    if (q !== null) {
      setInputValue(q);
    }
    setSort(order);
  }, [q, order]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleButtonClick() {
    setSearchParams((prev) => prev.set("q", inputValue));
    setSearchParams(searchParams);
  }
  return (
    <div>
      <div>
        <h1>Hi from Example page</h1>
        <input value={inputValue} onChange={handleInputChange} />
        {inputValue && <p>This is our input value: {inputValue}</p>}
        {q && <p>This is our searchParam value for q: {q}</p>}
        {sort && <p>This is the sort value: {sort}</p>}
        <button type="button" onClick={handleButtonClick}>
          Click to update the URL
        </button>
      </div>
      <button>
        <NavLink to="/" replace={true}>
          To the Homepage
        </NavLink>
      </button>
    </div>
  );
}
