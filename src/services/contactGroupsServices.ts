import axios from "axios";
import {
  AddNewContactType,
  CallRecord,
  Contact,
  CreateContactGroupPayload,
  Group,
} from "../types";

const BASE_URL = "http://1msg.1point1.in:3001/api/auth/j-v1";

export const getGroups = async (userId: string): Promise<Group[]> => {
  const response = await axios.get<Group[]>(
    `${BASE_URL}/groups/?user_id=${userId}`
  );
  return response.data; 
};

export const getConversationHistory = async (): Promise<Group[]> => {
  const response = await axios.get<Group[]>(`${BASE_URL}`);
  return response.data;
};

export const deleteContactGroup = async (groupId: string | number) => {
  return await axios.delete(`${BASE_URL}/contact-groups/delete/${groupId}/`);
};

export const createContactGroupApi = async (
  payload: CreateContactGroupPayload
) => {
  const response = await axios.post(
    `${BASE_URL}/contact-groups/create/`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getContacts = async (userId: string): Promise<Contact[]> => {
  const response = await axios.get<Contact[]>(
    `${BASE_URL}/contacts/by-group/?group_id=${userId}`
  );
  return response.data;
};

export const getCallHistoryByNumber = async (
  payload: any
): Promise<CallRecord[]> => {
  const response = await axios.get<CallRecord[]>(
    `${BASE_URL}/call-history/by-number/?number=${payload.number}&user_id=${payload.userId}`
  );
  return response.data;
};

export const addNewContactApi = async (payload: AddNewContactType) => {
  const response = await axios.post(`${BASE_URL}/contacts/create/`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const editContactGroups = async (payload: any) => {
  const response = await axios.put(
    `${BASE_URL}/contact-groups/edit/${payload.user_id}/`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteContacts = async (groupId: string | number) => {
  return await axios.delete(`${BASE_URL}/contacts/delete/${groupId}/`);
};

export const editContactDetails = async (payload: any) => {
  const response = await axios.put(
    `${BASE_URL}/contacts/edit/${payload.user_id}/`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
