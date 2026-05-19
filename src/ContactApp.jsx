import React from 'react'
import ContactList from './ContactList'
import ContactInput from './ContactInput'
import { getData } from './utils/data'

class ContactApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: getData(),
      keyword: '',
    }

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddContactHandler = this.onAddContactHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onDeleteHandler(id) {
    const contacts = this.state.contacts.filter(
      contact => contact.id !== id
    );

    this.setState({ contacts });
  }

  onAddContactHandler({ name, tag }) {
    this.setState((prevState) => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: +new Date(),
            name,
            tag,
            imageURL: '/images/c.jpg'
          }
        ]
      }
    })
  }

  onSearchHandler(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  render() {

    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(
        this.state.keyword.toLowerCase()
      )
    );

    return (
      <div className="contact_app">
        <h1>Aplikasi Kontak</h1>

        <h2>Tambah Kontak</h2>
        <ContactInput addContact={this.onAddContactHandler} />

        <h1>Daftar Kontak</h1>

        <div className="contact_search">
      
      <input
      type="text"
      placeholder="Cari kontak..."
      value={this.state.keyword}
      onChange={this.onSearchHandler}
      />
      </div>

        <ContactList
          contacts={filteredContacts}
          onDelete={this.onDeleteHandler}
        />
      </div>
    )
  }
}

export default ContactApp