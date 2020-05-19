import React from 'react';

interface Props {
    showSuggestions: boolean;
    userInput: string;
    filteredSuggestions: any[];
    activeSuggestion: number;
    onClick: any;
}

const SuggestionsList = ({showSuggestions, userInput, filteredSuggestions, activeSuggestion, onClick}: Props) => {
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <div className="suggestions">
                    <ul>
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    key={suggestion.id}
                                    onClick={onClick}
                                >
                                    {suggestion.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>Нет поисковых подсказок</em>
                </div>
            );
        }
    }

    return (
        <>
            {suggestionsListComponent}
        </>
    );
};

export default SuggestionsList;
