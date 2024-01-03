import React from "react";
import css from './Contact.module.css'

export const Contact = ({
    name,
    number, 
    id,
    handleDeleteProfile
}) => {
    return (
        <p className={css.contactLine}>
            <span className={css.contactName}>{name}</span>
            <span className={css.contactNumber}>{number}</span>
            <button className={css.contactDelete} onClick={() => handleDeleteProfile(id)}>Delete</button>
        </p>
    )
}

export default Contact;