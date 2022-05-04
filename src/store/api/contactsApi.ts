import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact } from "../../models/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    fetchContacts: builder.query<IContact[], void>({
      query: () => "/contacts",
    }),
    addContacts: builder.mutation<{}, IContact>({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
    }),
  }),
});

export const { useFetchContactsQuery, useAddContactsMutation } = contactsApi;
