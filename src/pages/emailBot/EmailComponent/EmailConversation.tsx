import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { emails as initialEmails } from './emails';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Email } from '../../../types';
import EmailList from './EmailList';
import EmailDetail from './EmailDetail';
import { Layout } from '../../../components';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchEmailConversations } from '../../../redux/nodeSlice/emailSlice';
import { useSelector } from 'react-redux';

const EmailConversation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const conversations = useSelector((state: RootState) => state.emailConversation.conversations);
  
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);  
  const [agentFilter, setAgentFilter] = useState('');
  const [keywordFilter, setKeywordFilter] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);

    // if (!email.isRead) {
    //   setEmails(conversations.map(e =>
    //     e.id === conversations?.id ? { ...e, isRead: true } : e
    //   ));
    // }
  };

  // const handleMarkAsRead = (emailId: string) => {
  //   setEmails(emails.map(email =>
  //     email.id === emailId ? { ...email, isRead: true } : email
  //   ));

  //   if (selectedEmail && selectedEmail.id === emailId) {
  //     setSelectedEmail({ ...selectedEmail, isRead: true });
  //   }
  // };

  // const handleStarEmail = (emailId: string) => {
  //   setEmails(emails.map(email =>
  //     email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
  //   ));

  //   if (selectedEmail && selectedEmail.id === emailId) {
  //     setSelectedEmail({ ...selectedEmail, isStarred: !selectedEmail.isStarred });
  //   }
  // };

  useEffect(() => {
    const fetchEmails = async () => {
      console.log("running useeffect");
      await dispatch(fetchEmailConversations());
    };

    fetchEmails();
  }, []);


  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: "#18181b",
          color: "#ffffff"
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography className="heading">Emails</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search by Agent"
              size="small"
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                width: 200,
                bgcolor: '#18181b',
                border: '1px solid #444',
                borderRadius: '8px',
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  pl: 1,
                },
                input: {
                  color: '#fff',
                  p: '10px',
                },
              }}
            />
            <TextField
              placeholder="Search by Keyword"
              size="small"
              value={keywordFilter}
              onChange={(e) => setKeywordFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                width: 200,
                bgcolor: '#18181b',
                border: '1px solid #444',
                borderRadius: '8px',
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  pl: 1,
                },
                input: {
                  color: '#fff',
                  p: '10px',
                },
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(date: Date | null) => setFromDate(date)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      width: 200,
                      bgcolor: '#18181b',
                      border: '1px solid #444',
                      borderRadius: '8px',
                      '& .MuiInputBase-root': {
                        borderRadius: '8px',
                        pl: 1,
                      },
                      '& .MuiInputBase-input': {
                        color: '#B8B9C1',
                        padding: '10px',
                        '::placeholder': {
                          color: '#B8B9C1',
                          opacity: 0.7,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#B8B9C1',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#B8B9C1',
                      },
                    },
                  },
                }}
              />
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(date) => setToDate(date)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      width: 200,
                      bgcolor: '#18181b',
                      border: '1px solid #444',
                      borderRadius: '8px',
                      '& .MuiInputBase-root': {
                        borderRadius: '8px',
                        pl: 1,
                      },
                      '& .MuiInputBase-input': {
                        color: '#fff',
                        padding: '10px',
                        '::placeholder': {
                          color: '#fff',
                          opacity: 0.7,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#B8B9C1',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#B8B9C1',
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              // onClick={handleSearch}
              startIcon={<Search />}
              sx={{
                borderRadius: '8px',
                bgcolor: '#ff5a1f',
                color: '#fff',
                px: 4,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            m: 2,
            overflow: 'hidden',
            p: 2,
            gap: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: "#2a2a33",
            borderRadius: "8px"
          }}
        >
          <Box sx={{ width: '350px', flexShrink: 0 }}>
            <EmailList
              conversations={conversations}
              onSelectEmail={handleSelectEmail}
              // selectedEmail={selectedEmail}
              // onStarEmail={handleStarEmail}
            />
          </Box>

          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <EmailDetail
              email={selectedEmail}
              // onMarkAsRead={handleMarkAsRead}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default EmailConversation;