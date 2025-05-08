import React from 'react'
import { Snackbar, Alert } from '@mui/material'

function Notification({ notification }) {

  if(!notification) return

  return (
    <div>
      <Snackbar
        open={true}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={Notification.type} variant="filled" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Notification