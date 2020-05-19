import React, {useEffect, useState} from 'react';
import SuggestionsList from '../SuggestionsList';
import {useDispatch} from 'react-redux';
import {getSuggestions} from '../../redux/suggestionsSlice';
import {AiOutlineSearch, AiOutlineCloseCircle} from 'react-icons/ai';

interface Props {
    suggestions: any;
    updateSuggestions: any;
}

const Autocomplete = ({suggestions, updateSuggestions}: Props) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');

    const dispatch = useDispatch();

    const onChange = (e: any) => {
        dispatch(getSuggestions(() => {
            updateSuggestions();
        }));

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

    const onClear = () => {
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput('');
    };

    useEffect(() => {
        if (suggestions) {
            const filteredSuggestions = suggestions.filter(
                (suggestion: any) =>
                    suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );
            setActiveSuggestion(0);
            setFilteredSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        }
    /* eslint-disable-next-line */
    }, [suggestions]);

    return (
        <div>
              <div className={userInput ? "input-row input-row-border" : "input-row"}>
                  <AiOutlineSearch size='1em' color='#7a7a7a' />
                  <input
                      type="text"
                      onChange={onChange}
                      value={userInput}
                      placeholder={'Поиск по магазину'}
                      required pattern="\S+.*"
                  />
                  <button onClick={onClear}><AiOutlineCloseCircle size='1.6em' color='#7a7a7a' /></button>
              </div>
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
