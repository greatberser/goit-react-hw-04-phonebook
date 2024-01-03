import React, { useState } from "react";
import css from './AddContactForm.module.css';

export const AddContactForm = ({ handleAddProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();

    const { name, number } = formData;

    const formattedNumber = number.replace(/[^0-9-]/g, ""); // Remove non-numeric characters
    const formattedFormData = {
      name,
      number: formattedNumber,
    };

    handleAddProfile(formattedFormData);
    setFormData({ name: "", number: "" });
  };

  return (
    <form className={css.form} onSubmit={handleEventSubmit}>
      <label className={css.label}>
        <span>Name: </span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className={css.label}>
        <span>Number: </span>
        <input
          type="tel"
          placeholder="111-11-11"
          name="number"
          title="Number may contain only numbers and dashes. For example 111-11-11"
          value={formData.number}
          onChange={handleInputChange}
          required
        />
      </label>
      <button className={css.submit} type="submit">
        Add New Profile
      </button>
    </form>
  );
};

export default AddContactForm;
