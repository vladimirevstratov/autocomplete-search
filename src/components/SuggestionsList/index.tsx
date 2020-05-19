import React from 'react';

interface Props {
    showSuggestions: boolean;
    userInput: string;
    filteredSuggestions: any[];
    activeSuggestion: number;
    onClick: () => void;
}

const SuggestionsList = ({showSuggestions, userInput, filteredSuggestions, activeSuggestion, onClick}: Props) => {
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                // @ts-ignore
                <ul class="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className = "suggestion-active";
                        }

                        return (
                            <li
                                className={className}
                                key={suggestion.id}
                                onClick={onClick}
                            >
                                {suggestion.name}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                // @ts-ignore
                <div class="no-suggestions">
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
