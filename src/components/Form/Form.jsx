import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class Form extends Component {
  state = { name: '', number: '' };

  handleInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };
    e.preventDefault();
    console.log(this.props.contacts);
    this.props.onSubmit(newContact);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const nameInputId = nanoid();
    const numberInputId = nanoid();
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          onChange={this.handleInput}
          value={this.state.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameInputId}
        />

        <label htmlFor={numberInputId}>Number</label>
        <input
          onChange={this.handleInput}
          value={this.state.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={numberInputId}
        />

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default Form;
