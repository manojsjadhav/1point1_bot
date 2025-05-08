import { Button, Dialog, DialogActions } from "@mui/material";

const TextareaPopup = ({
  handleTextareaClose,
  openTextarea,
  value,
  name,
  handleInputChange,
}: any) => {
  return (
    <Dialog
      open={openTextarea}
      onClose={handleTextareaClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: "600px",
          height: "600px",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#18181B",
        },
      }}
    >
      <textarea
        value={value}
        name={name}
        onChange={handleInputChange}
        placeholder="Type something..."
        style={{
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
          padding: "8px",
          fontFamily: "GeneralSans-m",
          fontSize: "12px",
          border: "none",
          outline: "none",
          background: "#18181B",
          color: "#fff",
          resize: "none",
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      />
      <DialogActions>
        <Button onClick={handleTextareaClose} className="btn">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextareaPopup;
