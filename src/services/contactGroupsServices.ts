import axios from "axios";
import { Contact, CreateContactGroupPayload, Group } from "../types";

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
  const response = await axios.post(`${BASE_URL}/contact-groups/create/`, {
    payload,
  });
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
): Promise<Contact[]> => {
  const response = await axios.get<Contact[]>(
    `${BASE_URL}/call-history/by-number/?number=${payload.number}&user_id=${payload.userId}`
  );
  return response.data;
};
