import React, {useEffect, useState} from 'react';
import SuggestionsList from '../SuggestionsList';
import {useDispatch, useSelector} from 'react-redux';
import {getSuggestions} from '../../redux/suggestionsSlice';

interface Suggestions {

}

interface Props {
    suggestions: any;
}

const Autocomplete = ({suggestions}: Props) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');

    const dispatch = useDispatch();

    console.log('suggestions in autocomplete', suggestions);

    // Event fired when the input value is changed
    const onChange = (e: any) => {
        //const userInput = e.currentTarget.value;
        dispatch(getSuggestions());

        setUserInput(e.currentTarget.value);
    };

    // Event fired when the user clicks on a suggestion
    const onClick = (e: any) => {
        // Update the user input and reset the rest of the state
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
    };

    // Event fired when the user presses a key down
    const onKeyDown = (e: any) => {
        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[activeSuggestion]);
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            setActiveSuggestion(activeSuggestion - 1);
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            setActiveSuggestion(activeSuggestion + 1);
        }
    };

    useEffect(() => {
        if (suggestions) {
            console.log('suggestions in useEffect', suggestions)
            const filteredSuggestions = suggestions.filter(
                (suggestion: any) =>
                    suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );
            setActiveSuggestion(0);
            setFilteredSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        }
    }, [suggestions]);

    return (
          <div className="autocomplete">
              <input
                  type="text"
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  value={userInput}
                  placeholder={'Поиск по магазину'}
                  required pattern="\S+.*"
              />
              <SuggestionsList
                  showSuggestions={showSuggestions}
                  userInput={userInput}
                  filteredSuggestions={filteredSuggestions}
                  activeSuggestion={activeSuggestion}
                  onClick={() => onClick}
              />
          </div>
    );
};

export default Autocomplete;
