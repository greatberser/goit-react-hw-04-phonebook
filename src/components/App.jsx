import React, { useState, useEffect } from 'react';
import { AddContactForm } from 'components/AddProfileForm/AddContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

const contactsData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || contactsData;
    setContacts(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddProfile = (formData) => {
    const existingContact = contacts.find(
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

    setContacts((prevContacts) => [...prevContacts, finalContact]);
  };

  const handleDeleteProfile = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const handleInputFilter = (evt) => {
    const searchName = evt.target.value;
    setFilter(searchName);
  };

  const filterContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filterContacts();

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <AddContactForm handleAddProfile={handleAddProfile} />

      <h2>Contacts</h2>
      <Filter filter={filter} handleInputFilter={handleInputFilter} />

      {filteredContacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          handleProfileDelete={handleDeleteProfile}
          title="Contacts"
        />
      )}
    </div>
  );
};

export default App;
