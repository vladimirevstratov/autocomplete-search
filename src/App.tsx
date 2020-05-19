import React from 'react';
import './App.css';
import Autocomplete from "./components/Autocomplete";
import {useSelector} from "react-redux";

function App() {
  const {suggestions} = useSelector((state: any) => state.suggestionsReducer) || [];

  console.log(suggestions);

  const newSuggestions = suggestions.map((suggestion: any) => ({
    id: suggestion.id,
    name: suggestion.name,
  }));

  console.log(newSuggestions);

  return (
      <div className="App">
        <header className="App-header">
          <Autocomplete suggestions={newSuggestions}
          />
        </header>
      </div>
  );
}

export default App;
