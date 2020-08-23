import {
  UPDATE_SEARCH_TERM,
  RESET_SEARCH_TERM,
  UPDATE_FILTER_CATEGORY,
  RESET_FILTER_CATEGORY,
  UPDATE_SORT_CRITERIA,
  RESET_SORT_CRITERIA,
} from "../reducers/ActionType";

const updateSearchTerm = (searchTerm) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: searchTerm,
  };
};

const resetSearchTerm = () => {
  return {
    type: RESET_SEARCH_TERM,
  };
};

const updateFilterCategory = (filterCategory) => {
  return {
    type: UPDATE_FILTER_CATEGORY,
    payload: filterCategory,
  };
};

const resetFilterCategory = () => {
  return {
    type: RESET_FILTER_CATEGORY,
  };
};

const updateSortCriteria = (sortCriteria) => {
  return { type: UPDATE_SORT_CRITERIA, payload: sortCriteria };
};

const resetSortCriteria = () => {
  return { type: RESET_SORT_CRITERIA };
};

export {
  updateSearchTerm,
  resetSearchTerm,
  updateFilterCategory,
  resetFilterCategory,
  updateSortCriteria,
  resetSortCriteria,
};
