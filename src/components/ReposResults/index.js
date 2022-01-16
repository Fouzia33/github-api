import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import Repo from './Repo';

const ReposResults = ({ results }) => (
  <Card.Group itemsPerRow={3}>
    {results.map((item) => (
      <Repo
        {...item}
        key={item.id}
      />
    ))}
  </Card.Group>
);

ReposResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default ReposResults;
