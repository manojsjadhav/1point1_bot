import axios, { AxiosError } from "axios"

export const postAgentFlow = async (payload: any): Promise<void> => {
    try {
      await axios.post('http://1msg.1point1.in:3001/api/auth/j-v1/user_req/', payload);
      console.log("Data posted successfully");
    } catch (error) {
      const err = error as AxiosError;
      console.error("Failed to post agent flow:", err.message);
    }
  };