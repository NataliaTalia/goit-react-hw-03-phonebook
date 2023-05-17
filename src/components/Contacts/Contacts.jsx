import React from 'react';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => onDelete(id)}>
            Delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;

Contacts.PropType = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
};
