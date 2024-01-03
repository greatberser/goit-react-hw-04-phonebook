import React, { Component } from "react";
import css from './AddContactForm.module.css'

export class AddContactForm extends Component {
  handleEventSubmit = event => {
    event.preventDefault();

    const name = event.target.elements.contactName.value;
    const number = event.target.elements.contactNumber.value;

    const formData = {
      name,
      number: Math.abs(Number(number)),
    };

    this.props.handleAddProfile(formData);
    event.target.reset();
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleEventSubmit}>
        <label className={css.label}>
          <span>Name: </span>
          <input 
            type="text" 
            placeholder="Name"
            name="contactName"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
          />
        </label>

        <label className={css.label}>
          <span>Number: </span>
          <input 
            type="tel" 
            placeholder="111-11-11"
            name="contactNumber"
            // pattern="\d{3}[\-]\d{2}[\-]\d{2}"
            title="Number may contain only numbers and dashes. For example 111-11-11"
            required
          />
        </label>
        <button className={css.submit} type="submit">Add New Profile</button>
      </form>
    );
  }
}
