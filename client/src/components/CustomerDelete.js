import { Dialog, Button, DialogContent, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import { useState } from 'react';
import React from 'react';

function CustomerDelete({stateRefresh, id}) {

   const [open, setOpen] = useState(false);

   const deleteCustomer = (id) => {
      const url = 'api/customers/' + id;
      fetch(url, {
         method: 'DELETE'
      });
      stateRefresh();
   }

   const handleClickOpen = () => {
      setOpen(true);
   }
   const handleClose = () => {
      setOpen(false);
   }

   return (
      <div>
         <Button variant="contained" color="secondary" onClick={handleClickOpen}>삭제</Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>
               삭제경고
            </DialogTitle>
         <DialogContent>
            <Typography gutterBottom>
               선택한 고객정보가 삭제됩니다
            </Typography>
         </DialogContent>
         <DialogActions>
            <Button variant="contained" color="primary" onClick={(e) => deleteCustomer(id)}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
      </DialogActions>
         </Dialog>
      </div>
   );
}

export default CustomerDelete;