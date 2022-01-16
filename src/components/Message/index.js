import React from 'react';
import PropTypes from 'prop-types';
// definition of another name for the import, otherwise it conflicts with the name of the component
import { Message as MessageSemantic } from 'semantic-ui-react';

const Message = ({ nbResults }) => (
  <MessageSemantic>
    {nbResults} résultat(s)
  </MessageSemantic>
);

Message.propTypes = {
  nbResults: PropTypes.number.isRequired,
};

export default Message;
