import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  /*   // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading();
    const res = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();

    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  }; */

  // Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    // this is destructuring the data.items
    const { items } = await res.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // Set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  // Reset users
  const resetUsers = () => {
    dispatch({
      type: 'RESET_USERS',
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        resetUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
