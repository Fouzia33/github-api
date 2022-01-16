import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Segment } from 'semantic-ui-react';

const SearchBar = ({ search, updateSearchValue, manageSubmit }) => {
  // Declaration of a variable and use on the desired element
  // https://fr.reactjs.org/docs/refs-and-the-dom.html
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <Segment>
      <Form
        onSubmit={(event) => {
          event.preventDefault();

          manageSubmit();
        }}
      >
        <Form.Field>
          <Input
            icon="search"
            placeholder="Rechercher..."
            iconPosition="left"
            value={search}
            onChange={(event) => {
              updateSearchValue(event.currentTarget.value);
            }}
            ref={textInput}
          />
        </Form.Field>
      </Form>
    </Segment>
  );
};

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  updateSearchValue: PropTypes.func.isRequired,
  manageSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
