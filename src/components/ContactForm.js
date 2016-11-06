import React, { Component, PropTypes } from 'react';

class ContactForm extends Component {
  propTypes: {
    contact: PropTypes.object.isRequired
  }

  render() {
    const { contact } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <span>{!contact.hasError('firstName') ? 'Valide' : 'Invalide'}</span>
          <input name="firstName" value={contact.get('firstName')} onChange={this.handleChange} />
        </label>
        <label>
          <span>{!contact.hasError('lastName') ? 'Valide' : 'Invalide'}</span>
          <input name="lastName" value={contact.get('lastName')} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    );
  }

  handleChange = (event) => {
    const { contact, onChange } = this.props;
    const { target } = event;
    onChange(contact.set(target.name, target.value));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { contact, onChange } = this.props;
    onChange(contact.bindErrors({
      firstName: 'This should be "Alex"'
    }));
  }
}

export default ContactForm;
