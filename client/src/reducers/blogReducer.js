import { BlogActionTypes } from '../actions/blogActions'


const initialState = {
    articles: [],
    loaded:false
}

export default function(state = initialState, action) {
    const { type, payload} = action;
    switch(type) {
        case BlogActionTypes.FETCH_ARTICLES:
            return { ...state, articles: payload, loaded:true }
        case BlogActionTypes.POST_ARTICLE:
            return {...state, articles: [payload, ...state.articles]}
        case BlogActionTypes.DELETE_ARTICLE:
            return { ...state, articles: state.articles.filter(article => article.id !== payload)}
        case BlogActionTypes.EDIT_ARTICLE:
            return{ ...state, articles: state.articles.map(article => {
                if(article.id === payload.id) {
                    return payload
                }
                return article
            })}
        default:
            return state
    }
}