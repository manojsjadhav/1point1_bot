import { Email } from "../../../types";

const generateAvatarUrl = (name: string) => {
  // Using a placeholder avatar with the first letter of the name
  const initial = name.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff`;
};

export const emails: Email[] = [
  {
    id: "1",
    from: {
      name: "John Doe",
      email: "john.doe@point1.com",
      avatar: generateAvatarUrl("John Doe"),
    },
    subject: "Testing failed for a bot!",
    preview:
      "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    body: "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    isRead: false,
    isStarred: false,
    date: new Date("2024-05-22T10:30:00"),
    labels: ["Technical Problem"],
    attachments: 2,
    folder: "inbox",
  },
  {
    id: "2",
    from: {
      name: "John Doe",
      email: "john.doe@point1.com",
      avatar: generateAvatarUrl("John Doe"),
    },
    subject: "Testing failed for a bot!",
    preview:
      "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    body: "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    isRead: false,
    isStarred: false,
    date: new Date("2024-05-22T10:30:00"),
    labels: ["Technical Problem"],
    attachments: 2,
    folder: "inbox",
  },
  {
    id: "3",
    from: {
      name: "John Doe",
      email: "john.doe@point1.com",
      avatar: generateAvatarUrl("John Doe"),
    },
    subject: "Testing failed for a bot!",
    preview:
      "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    body: "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    isRead: false,
    isStarred: false,
    date: new Date("2024-05-22T10:30:00"),
    labels: ["Technical Problem"],
    folder: "inbox",
  },
  {
    id: "4",
    from: {
      name: "John Doe",
      email: "john.doe@point1.com",
      avatar: generateAvatarUrl("John Doe"),
    },
    subject: "Testing failed for a bot!",
    preview:
      "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    body: "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    isRead: false,
    isStarred: true,
    date: new Date("2024-05-24T10:30:00"),
    labels: ["Technical Problem"],
    attachments: 2,
    folder: "inbox",
  },
  {
    id: "5",
    from: {
      name: "John Doe",
      email: "john.doe@point1.com",
      avatar: generateAvatarUrl("John Doe"),
    },
    subject: "Testing failed for a bot!",
    preview:
      "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    body: "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    isRead: true,
    isStarred: false,
    date: new Date("2024-05-24T10:30:00"),
    labels: ["Technical Problem"],
    folder: "inbox",
  },
  {
    id: "6",
    from: {
      name: "John Doe",
      email: "john.doe@point1.com",
      avatar: generateAvatarUrl("John Doe"),
    },
    subject: "Testing failed for a bot!",
    preview:
      "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    body: "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    isRead: true,
    isStarred: true,
    date: new Date("2024-05-24T10:30:00"),
    labels: ["Technical Problem"],
    folder: "inbox",
  },
  {
    id: "7",
    from: {
      name: "Me",
      email: "me@example.com",
      avatar: generateAvatarUrl("Me"),
    },
    subject: "Testing failed for a bot!",
    preview:
      "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    body: "Embedding Model for SBI bot is experiencing surge in the response from the voice model endshit.sdfs",
    isRead: true,
    isStarred: false,
    date: new Date("2024-05-24T10:30:00"),
    labels: ["Technical Problem"],
    folder: "sent",
  },
];
