import { useState } from "react";
import Data from "./Data";

let getUniqueCategories = () => {
  let filterCategories = Data.map((data) => {
    return data.category;
  });
  let uniqueCategories = ["all", ...new Set(filterCategories)];
  return uniqueCategories;
};

const App = () => {
  let [value, setValue] = useState("");
  let [suggestionData, setSuggestionData] = useState([]);
  let [filterUi, setFilterUi] = useState(Data);
  let [filteredCategories, setFilteredCategories] =
    useState(getUniqueCategories);

  let handleChange = (e) => {
    setValue(e.target.value);

    let filteredData = Data.filter((data) =>
      data.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (e.target.value === "") {
      setSuggestionData([]);
      return;
    }

    setSuggestionData(filteredData);
  };

  let handleSuggestion = (id) => {
    let findData = suggestionData.filter((data) => data.id === id);
    let getName = findData.map((data) => {
      setValue(data.name);
    });
    setSuggestionData([]);
  };

  let updateUi = () => {
    let filteredData = Data.filter((data) => {
      return data.name.toLowerCase().includes(value.toLowerCase());
    });

    setFilterUi(filteredData);
    setValue("");
  };

  let categoryData = (category) => {
    if (category === "all") {
      return setFilterUi(Data);
    }

    let filterCategory = Data.filter((data) => data.category === category);
    setFilterUi(filterCategory);
  };

  return (
    <div className="container">
      <div className="filter-sec">
        <ul>
          {filteredCategories.map((item, itemIdx) => {
            return (
              <li key={itemIdx} onClick={() => categoryData(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="content-sec">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={value} onChange={handleChange} />
          <button type="submit" onClick={updateUi}>
            search
          </button>
          <div className="suggestion-block">
            <ul>
              {suggestionData.map((data, dataIdx) => {
                return (
                  <li key={dataIdx} onClick={() => handleSuggestion(data.id)}>
                    {data.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </form>

        <div className="display-content">
          {filterUi.map((data, dataIdx) => {
            return (
              <div className="data-item" key={dataIdx}>
                <span> {data.category} </span>
                <h2> {data.name} </h2>
                <p> {data.description} </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
