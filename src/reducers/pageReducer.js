import {
  UPDATE_SEARCH_TERM,
  RESET_SEARCH_TERM,
  UPDATE_FILTER_CATEGORY,
  RESET_FILTER_CATEGORY,
  UPDATE_SORT_CRITERIA,
  RESET_SORT_CRITERIA,
} from "./ActionType";

const INITIAL_STATE = {
  searchTerm: "",
  filterCategory: "",
  sortCriteria: "newest",
};

const pageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case RESET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: "",
      };
    case UPDATE_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.payload,
      };
    case RESET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: "",
      };
    case UPDATE_SORT_CRITERIA:
      return {
        ...state,
        sortCriteria: action.payload,
      };
    case RESET_SORT_CRITERIA:
      return {
        ...state,
        sortCriteria: "newest",
      };

    default:
      return state;
  }
};

export { pageReducer };
