export interface Group {
  id: string;
  group_name: string;
  created_date: string;
  created_by?: string;
  group_avtar?: string;
}

export type Conversation = {
  id: number;
  person_name: string;
  phone_number: string;
  dailer: string;
  connectedBy: string;
  call_duration: string;
  recording_path: string;
};

export interface CreateContactGroupPayload {
  user_id: string;
  group_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group_avtar: any;
  formated_number: string;
}

export interface ContactGroupState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface Contact {
  id: number;
  user_id: number;
  group_id: number;
  person_name: string;
  phone_number: string;
  formated_number: string;
  created_date: string;
}

export interface CallRecord {
  group_id: number;
  user_id: number;
  dailer: string;
  agent_id: number;
  created_date: string;
  recording_path: string;
  call_duration: number;
  contact_id: number;
  person_name: string;
}

export interface AddNewContactType {
  user_id: string;
  group_id: string;
  person_name: string;
  phone_number: string;
  formated_number: string;
}

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  date: Date;
  labels: string[];
  attachments?: number;
  folder: "inbox" | "sent" | "drafts" | "trash";
}
