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
