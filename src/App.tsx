import React, {useState} from 'react';
import './App.css';
import Autocomplete from "./components/Autocomplete";
import {useSelector} from "react-redux";

function App() {
  const {suggestions} = useSelector((state: any) => state.suggestionsReducer) || [];

  const [suggestionsState, setSuggestionsState] = useState([]);

  const updateSuggestions = () => {
      if (suggestions) {
          const newSuggestions = suggestions.map((suggestion: any) => ({
              id: suggestion.id,
              name: suggestion.name,
          }));
          setSuggestionsState(newSuggestions);
      }
  }

  return (
      <div className="App">
        <header className="App-header">
          <Autocomplete
              suggestions={suggestionsState}
              updateSuggestions={updateSuggestions}
          />
        </header>
      </div>
  );
}

export default App;
