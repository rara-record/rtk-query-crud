import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact } from "../../models/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    fetchContacts: builder.query<IContact[], void>({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    fetchContactById: builder.query<IContact, string>({
      query: (id) => `/contacts/${id}`,
    }),
    addContact: builder.mutation<{}, IContact>({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    upDateContact: builder.mutation<void, IContact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useFetchContactByIdQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpDateContactMutation,
} = contactsApi;
