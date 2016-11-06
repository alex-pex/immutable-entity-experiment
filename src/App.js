import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import Immutable from 'immutable';

class Contact extends Immutable.Record({
  firstName: '',
  lastName: '',
  _errors: Immutable.Map()
}) {
  hasError(field) {
    return this.hasIn(['_errors', field]);
  }

  getError(field) {
    return this.getIn(['_errors', field]);
  }

  bindErrors(errors) {
    return this.set('_errors', Immutable.Map(errors));
  }
}

class App extends Component {
  state = {
    contact: new Contact({
      firstName: 'Alex'
    })
  }

  render() {
    const { contact } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ContactForm contact={contact} onChange={this.handleContactChange} />
      </div>
    );
  }

  handleContactChange = (nextContact) => {
    this.setState({
      contact: nextContact
    })
  }
}

export default App;
