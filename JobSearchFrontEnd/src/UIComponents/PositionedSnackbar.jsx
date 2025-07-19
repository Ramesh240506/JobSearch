// PositionedSnackbar.jsx
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function PositionedSnackbar({ message, open, onClose }) {
  const vertical = 'top';
  const horizontal = 'center';

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={onClose}
      message={message}
      autoHideDuration={3000}
      key={vertical + horizontal}
        >

       <Alert
        onClose={onClose}
        severity="error"        // 🔥 Shows red error styling
        sx={{ width: '100%' }} // Optional: make alert fill snackbar width
      >
        {message}
      </Alert>
        </Snackbar>
    
  );
}
