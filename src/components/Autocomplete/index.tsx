import React, {useEffect, useState} from 'react';
import SuggestionsList from '../SuggestionsList';
import {useDispatch} from 'react-redux';
import {getSuggestions} from '../../redux/suggestionsSlice';

interface Props {
    suggestions: any;
}

const Autocomplete = ({suggestions}: Props) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');

    const dispatch = useDispatch();

    const onChange = (e: any) => {
        dispatch(getSuggestions());

        setUserInput(e.currentTarget.value);
    };

    // Event fired when the user clicks on a suggestion
    const onClick = (e: any) => {
        console.log('e', e);
        // Update the user input and reset the rest of the state
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
    };

    useEffect(() => {
        const filteredSuggestions = suggestions.filter(
            (suggestion: any) =>
                suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true)
    /* eslint-disable-next-line */
    }, [suggestions]);

    return (
          <div className="autocomplete">
              <input
                  type="text"
                  onChange={onChange}
                  value={userInput}
                  placeholder={'Поиск по магазину'}
                  required pattern="\S+.*"
              />
              <SuggestionsList
                  showSuggestions={showSuggestions}
                  userInput={userInput}
                  filteredSuggestions={filteredSuggestions}
                  activeSuggestion={activeSuggestion}
                  onClick={onClick}
              />
          </div>
    );
};

export default Autocomplete;
