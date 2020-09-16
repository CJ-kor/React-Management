import React, { useState } from 'react';
import { post } from 'axios';

function CustomerAdd({stateRefresh}) {
   const [file, setFile] = useState(null);
   const [userName, setUserName] = useState("");
   const [birthday, setBirthday] = useState("");
   const [gender, setGender] = useState("");
   const [job, setJob] = useState("");
   const [fileName, setFileName] = useState("");

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

   return (
      <div>
         <form onSubmit={handleSubmit}>
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
         </form>
      </div>
   );
}

export default CustomerAdd;