import axios from "axios";

export const getEmailConversations = async () => {
  const response = await axios.get(
    `http://1msg.1point1.in:3001/api/email/bot/get/all-emails/with-tickets/j-v1/`
  );
  return response.data;
};

export const getEmailByTickectIdConversations = async (tikect_id: string) => {
  const response = await axios.get(
    `http://1msg.1point1.in:3001/api/email/bot/get/emails/ticket-details/j-v1/?ticket_id=${tikect_id}`
  );
  return response.data;
};
