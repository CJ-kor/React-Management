import React from 'react';
import CustomerDelete from './CustomerDelete';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


function Customer({ id, image, name, birthday, gender, job, stateRefresh }) {
   return (
      <div>
         <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell><img src={image} alt="profile"/></TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{birthday}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{job}</TableCell>
            <TableCell><CustomerDelete stateRefresh={stateRefresh} id={id} /></TableCell>
         </TableRow>
      </div>
   );
}

export default Customer;