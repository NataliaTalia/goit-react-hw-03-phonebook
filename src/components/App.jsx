import React, { Component } from 'react';

import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const { name, number } = data;
    // this.setState(() => {
    //   this.state.contacts.push(data);
    // });
    // console.log(this.state.contacts);
    // console.log(data);

    const existingContact = this.state.contacts.find(
      contact => contact.name === name && contact.number === number
    );
    console.log(existingContact);

    if (existingContact) {
      alert(`${existingContact.name} already exists`);
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          { name: data.name, number: data.number, id: data.id },
        ],
      }));
    }
  };

  filterHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('previous State:', prevState);
    console.log('currents state:', this.state);
    if (this.state.contacts !== prevState.contacts) {
      console.log('Contacts array has changed');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;

    const visibleContacts = this.getVisibleContact();

    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} contacts={contacts} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterHandler} />
        <Contacts contacts={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}

export default App;
