import { Box, Button, Dialog, Typography } from "@mui/material";
import "./chatbotcss/CodePopup.scss";
import Copy from "../../assets/chatbotIcon/Copy.svg";

const CodePopup = ({ openCodePopup, handleCodeClose }: any) => {
  return (
    <Dialog
      open={openCodePopup}
      onClose={handleCodeClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          backgroundColor: "#2A2A33",
          width: "450px",
          p: "16px",
          borderRadius: "8px",
          boxShadow: "none",
          border: "1px solid #4c4d58",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(69, 69, 69, 0.3)",
        },
      }}
    >
      <Typography className="code-heading">Get Embed Code</Typography>
      <Box className="code-content">
        <Typography className="description">
          To add the chatbot anywhere on your website, add this iFrame to your
          html code:
        </Typography>
        <Box component="pre" className="code">
          <code>
            {`import speech_recognition as sr
import pyttsx3

# Initialize recognizer and text-to-speech engine
recognizer = sr.Recognizer()
engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
    try:
        command = recognizer.recognize_google(audio)
        print("You said:", command)
        return command.lower()
    except sr.UnknownValueError:
        speak("Sorry, I didn't understand that.")
        return ""
    except sr.RequestError:
        speak("Sorry, there's a problem with the speech service.")
        return ""

# Main loop
speak("Hello! How can I help you?")
while True:
    command = listen()
    if "hello" in command:
        speak("Hi there!")
    elif "your name" in command:
        speak("I am your voice assistant.")
    elif "stop" in command or "exit" in command:
        speak("Goodbye!")
        break
    elif command:
        speak("You said: " + command)`}
          </code>
        </Box>
        <Button className="code-btn">
          <Box
            component="img"
            src={Copy}
            alt="Publish"
            sx={{ width: 22, height: 22 }}
          />
          Copy Code
        </Button>
      </Box>
      <Box className="code-content">
        <Typography className="description">
          To add the chatbot anywhere on your website, add this iFrame to your
          html code:
        </Typography>
        <Box component="pre" className="code">
          <code>
            {`import speech_recognition as sr
import pyttsx3

# Initialize recognizer and text-to-speech engine
recognizer = sr.Recognizer()
engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    with sr.Microphone() as source:
        print("Listening...")
        audio = recognizer.listen(source)
    try:
        command = recognizer.recognize_google(audio)
        print("You said:", command)
        return command.lower()
    except sr.UnknownValueError:
        speak("Sorry, I didn't understand that.")
        return ""
    except sr.RequestError:
        speak("Sorry, there's a problem with the speech service.")
        return ""

# Main loop
speak("Hello! How can I help you?")
while True:
    command = listen()
    if "hello" in command:
        speak("Hi there!")
    elif "your name" in command:
        speak("I am your voice assistant.")
    elif "stop" in command or "exit" in command:
        speak("Goodbye!")
        break
    elif command:
        speak("You said: " + command)`}
          </code>
        </Box>
        <Button className="code-btn">
          <Box
            component="img"
            src={Copy}
            alt="Publish"
            sx={{ width: 22, height: 22 }}
          />
          Copy Code
        </Button>
        <Box className="btn-container">
          <Button
            className="code-btn cancel-btn"
            sx={{ border: "1px solid #4c4d58", color: "#FFF" }}
          >
            Cancel
          </Button>
          <Button className="code-btn back-btn">Back to Agents</Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CodePopup;
