import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
//import Immutable from 'immutable';
import { Map as ImmutableMap } from 'extendable-immutable'

class ImmutableEntity extends ImmutableMap {
  getId() {
    return this.get('@id');
  }

  hasError(field) {
    return this.hasIn(['@errors', field]);
  }

  getError(field) {
    return this.getIn(['@errors', field]);
  }

  bindErrors(errors) {
    return errors ? this.set('@errors', new ImmutableMap(errors)) : this.remove('@errors');
  }
}

const Entity = {
  define (name, defaultValues = {}) {
    this[name] = (values) => new ImmutableEntity({
      ...defaultValues,
      ...values
    });
  }
}

Entity.define('Contact', {
  firstName: '-',
  lastName: '-'
});

class App extends Component {
  state = {
    contact: Entity.Contact({
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
