import React, { useState } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   hidden: {
      display: 'none'
   }
})


function CustomerAdd({stateRefresh, classes}) {
   const [file, setFile] = useState(null);
   const [userName, setUserName] = useState("");
   const [birthday, setBirthday] = useState("");
   const [gender, setGender] = useState("");
   const [job, setJob] = useState("");
   const [fileName, setFileName] = useState("");
   const [open, setOpen] = useState(false);

   const addCustomer = () => {
      const url = '/api/customers';
      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', userName);
      formData.append('birthday', birthday);
      formData.append('gender', gender);
      formData.append('job', job);

      const config = {
         headers: {
           'content-type': "multipart/form-data"
         }        
      }
      return post(url, formData, config);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      addCustomer()
      .then ((response) => {
         console.log(response.data);
         stateRefresh();
      })
      setFile(null);
      setUserName('');
      setBirthday('');
      setGender('');
      setJob('');
      setFileName('');
      setOpen(false);
      // window.location.reload();      
   }
   const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.value);
   }
   const handleNameChange = (e) => {
      setUserName(e.target.value);
   }
   const handleBirthdayChange = (e) => {     
      setBirthday(e.target.value);
   }
   const handleGenderChange = (e) => {     
      setGender(e.target.value);
   }
   const handleJobChange = (e) => {     
      setJob(e.target.value);
   }

   const handleClickOpen = () => {
      setOpen(true);
   }
   const handleClose = () => {
      setFile(null);
      setUserName('');
      setBirthday('');
      setGender('');
      setJob('');
      setFileName('');
      setOpen(false);
   }

   
   return (
      <div>
         <Button variant="contained" color="primary" onClick={handleClickOpen}>
            고객추가하기
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>고객추가</DialogTitle>
            <DialogContent>
               <input className={classes.hidden} type="file" accept="image/*" id="raised-button-file" file={file} value={fileName} onChange={handleFileChange} />
               <label htmlFor="raised-button-file">
                  <Button variant="contained" color="primary" component="span" name="file">
                  {fileName === "" ? "프로필이미지 선택" : fileName}
                  </Button>
               </label>
               <TextField label="이름" input type="text" name="userName" value={userName} onChange={handleNameChange} />
               <TextField label="생년월일" input type="text" name="birthday" value={birthday} onChange={handleBirthdayChange} />
               <TextField label="성별" input type="text" name="gender" value={gender} onChange={handleGenderChange} />
               <TextField label="직업" input type="text" name="job" value={job} onChange={handleJobChange} />
            </DialogContent>
            <DialogActions>
               <Button variant="contained" color="primary" onClick={handleSubmit}>추가</Button>
               <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
         </Dialog>
         {/* <form onSubmit={handleSubmit}>
            <h1>고객추가</h1>
               프로필이미지: 
               <input type="file" name="file" file={file} value={fileName} onChange={handleFileChange} />
               이름:
               <input type="text" name="userName" value={userName} onChange={handleNameChange} />
               생년월일:
               <input type="text" name="birthday" value={birthday} onChange={handleBirthdayChange} />
               성별:
               <input type="text" name="gender" value={gender} onChange={handleGenderChange} />
               직업:
               <input type="text" name="job" value={job} onChange={handleJobChange} />
            <button type="submit">추가하기</button>
         </form> */}
      </div>
   );
}

export default withStyles(styles)(CustomerAdd);