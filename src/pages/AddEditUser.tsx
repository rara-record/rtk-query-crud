import "./AddEditUser.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAddContactsMutation } from "../store/api/contactsApi";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, contact } = formValue;
  const [addContacts] = useAddContactsMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error("Please provide value into each input field");
    } else {
      navigate("/");
      toast.success("Contact Added Successfully");
    }
    await addContacts(formValue);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          onChange={handleInputChange}
        />

        <input type="submit"></input>
      </form>
    </div>
  );
};

export default AddEditUser;
