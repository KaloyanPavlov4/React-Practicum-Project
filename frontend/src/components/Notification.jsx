import React from 'react'
import { Snackbar, Alert, Button } from '@mui/material'

function Notification({ notification }) {

  if(!notification) return

  return (
    <div>
      <Snackbar
        open={true}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Notification