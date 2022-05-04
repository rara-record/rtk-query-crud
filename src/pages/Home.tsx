import "./Home.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { contactsApi, useFetchContactsQuery } from "../store/api/contactsApi";
import ContactSection from "./ContactSection";

const Home = () => {
  const { data, error, isLoading, isSuccess, isFetching } =
    useFetchContactsQuery();

  useEffect(() => {
    if (error) {
      toast.error("데이터를 불러오지 못했습니다");
    }
  }, [error]);

  return (
    <section className="contact-app">
      <h2>Redux Toolkit RTK Query CRUD with React and JSON Server</h2>
      <Link to="/add" className="add-contact-link">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>

        {isSuccess && (
          <tbody>
            {data?.map((contact, index) => {
              return (
                <ContactSection
                  key={contact.id}
                  contact={contact}
                  index={index}
                />
              );
            })}
          </tbody>
        )}
      </table>

      {isLoading && <div>Loading...</div>}
    </section>
  );
};

export default Home;
