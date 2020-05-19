import {createSlice} from '@reduxjs/toolkit';
import {AppThunk} from './store';

interface Suggestion {
    title: string;
}

interface SuggestionsState {
    suggestions: Suggestion[];
}

const initialState: SuggestionsState = {
    suggestions: [],
};

export const suggestionsSlice = createSlice({
    name: 'suggestions',
    initialState,
    reducers: {
        setSuggestions: (state: any, action: any) => {
            console.log('action', action);
            state.suggestions = action.payload.items;
        },
    },
});

export const { setSuggestions } = suggestionsSlice.actions;

export const getSuggestions = (): AppThunk => dispatch => {
    fetch('https://api.savetime.net/v1/client/suggest/item?q=молоко&brandId=24&shopId=1187')
        .then((suggestions: any) => suggestions.json())
        .then((suggestionsJson: any) => dispatch(setSuggestions(suggestionsJson)))
        .catch(err => console.log('error in fetch: ', err));
};

export default suggestionsSlice.reducer;
