import { SxProps } from "@mui/material/styles";

export const EmailHeaderStyles: Record<string, SxProps> = {
  container: {
    p: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "#41414b",
    borderRadius: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  subjectRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    mb: 0.5,
  },
  subject: {
    fontWeight: 500,
    color: "#fff",
    mr: 1,
  },
  emailId: {
    color: "#B8B9C1",
  },
  tagRow: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  tagText: {
    color: "#B8B9C1",
  },
  flagIcon: {
    color: "#1976d2",
    fontSize: 18,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    ml: 2,
  },
  markReadButton: {
    backgroundColor: "#5d5e6c",
    color: "#fff",
    textTransform: "none",
    borderRadius: "8px",
    fontWeight: 400,
    fontSize: "14px",
    px: 2,
    py: 1,
    minWidth: "auto",
    "&:hover": {
      backgroundColor: "#5a5a6a",
    },
  },
  moreButton: {
    color: "#fff",
  },
};

export const MessageItemStyles: Record<string, SxProps> = {
  container: {
    bgcolor: "#18181b",
    p: 2,
    display: "flex",
    flexDirection: "column",
    gap: 1,
    borderBottom: "1px solid #5d5e6c",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    mr: 1,
  },
  userName: {
    color: "#fff",
    fontWeight: 500,
  },
  timestamp: {
    color: "#B8B9C1",
    fontSize: "14px",
  },
  messageText: {
    color: "#B8B9C1",
    fontSize: "14px",
  },
  attachmentRow: {
    display: "flex",
    alignItems: "center",
    mt: 0.5,
  },
  attachmentIcon: {
    color: "#B8B9C1",
    fontSize: 18,
    mr: 0.5,
  },
  attachmentLink: {
    fontSize: "14px",
    color: "#64b5f6",
    cursor: "pointer",
  },
};
