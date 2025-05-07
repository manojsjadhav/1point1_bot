import axios from "axios";
import { Group } from "../types";

const BASE_URL = "http://1msg.1point1.in:3001/api/auth/j-v1";

export const getGroups = async (userId: string): Promise<Group[]> => {
  const response = await axios.get<Group[]>(
    `${BASE_URL}/groups/?user_id=${userId}`
  );
  return response.data;
};

export const getConversationHistory = async (
): Promise<Group[]> => {
  const response = await axios.get<Group[]>(
    `${BASE_URL}`
  );
  return response.data;
};
