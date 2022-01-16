// == Import npm
import React, { useState } from 'react';
import axios from 'axios';
import { Dimmer, Loader, Message as MessageSemantic } from 'semantic-ui-react';

// fichier CSS pour semantic-ui-react
import 'semantic-ui-css/semantic.min.css';

// == Import
import SearchBar from 'src/components/SearchBar';
import Message from 'src/components/Message';
import ReposResults from 'src/components/ReposResults';
import MoreResults from 'src/components/MoreResults';

import logoGithub from 'src/assets/images/logo-github.png';
import './styles.scss';

// == Composant
const App = () => {
  // Field search value
  const [search, setSearch] = useState('');
  // Repositories to display
  const [repos, setRepos] = useState([]);
  // Result number
  const [nbRepos, setNbRepos] = useState(0);
  // Loader
  const [loading, setLoading] = useState(false);
  // Display error
  const [displayError, setDisplayError] = useState(false);
  // All results
  const [total, setTotal] = useState(0);

  const makeSearch = () => {
    setLoading(true);

    // Addition of parameters to manage the pagination of results
    axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=1&per_page=9`)
      .then((response) => {
        setRepos(response.data.items);
        setNbRepos(response.data.total_count);

        // The total number of results
        setTotal(response.data.total_count);

        // we remove the previous possible error
        setDisplayError(false);
      })
      .catch((error) => {
        setDisplayError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMoreResults = () => {
    setLoading(true);

    axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=${(repos.length / 9) + 1}&per_page=9`)
      .then((response) => {
        setRepos([
          ...repos,
          // Use of spread operator to retrieve array elements
          ...response.data.items,
        ]);
      })
      .catch((error) => {
        setDisplayError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <header className="logo-github">
        <img src={logoGithub} alt="" />
      </header>
      <SearchBar search={search} updateSearchValue={setSearch} manageSubmit={makeSearch} />
      {!displayError && <Message nbResults={nbRepos} />}
      {displayError && (
        <MessageSemantic negative>
          Une erreur s'est produite
        </MessageSemantic>
      )}
      <ReposResults results={repos} />
      {repos.length !== total && (
        <MoreResults
          fetchMore={fetchMoreResults}
        />
      )}
      {loading && (
        <Dimmer active page>
          <Loader>Récupération des résultats...</Loader>
        </Dimmer>
      )}
    </div>
  );
};

// == Export
export default App;
