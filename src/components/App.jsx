import React, { Component } from 'react';
import { AddContactForm } from 'components/AddProfileForm/AddContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

const contactsData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || contactsData;
    this.setState({ contacts: storedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddProfile = (formData) => {
    const existingContact = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${formData.name} is already in contacts!`);
      return;
    }

    const finalContact = {
      ...formData,
      id: Math.random().toString(),
    };

    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, finalContact],
      };
    });
  };

  handleDeleteProfile = (contactId) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== contactId),
    });
  };

  handleInputFilter = (evt) => {
    const searchName = evt.target.value;
    this.setState({ filter: searchName });
  };

  filterContacts = () => {
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.filterContacts();
    return (
      <div className="container">
        <h2>Phonebook</h2>
        <AddContactForm handleAddProfile={this.handleAddProfile} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleInputFilter={this.handleInputFilter} />

        {filteredContacts.length > 0 && (
          <ContactList
            contacts={filteredContacts}
            handleProfileDelete={this.handleDeleteProfile}
            title="Contacts"
          />
        )}
      </div>
    );
  }
}
