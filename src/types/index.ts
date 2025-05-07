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
