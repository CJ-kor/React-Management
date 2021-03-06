import React, { useEffect, useState } from 'react';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
// import classes from '*.module.css';
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

function App({classes}) {
//   const customers = [{
//   id: 1,
//   image: 'https://placeimg.com/64/64/1',
//   name: '나동빈',
//   birthday: '961222',
//   gender: '남자',
//   job: '대학생'
// },
// {
//   id: 2,
//   image: 'https://placeimg.com/64/64/2',
//   name: '홍길동',
//   birthday: '941222',
//   gender: '남자',
//   job: '백수'
// },
// {
//   id: 3,
//   image: 'https://placeimg.com/64/64/3',
//   name: '김만두',
//   birthday: '482920',
//   gender: '여자',
//   job: '코더'
// }]

  const [customers, setCustomers] = useState("")
  const [completed, setCompleted] = useState(0)
  
  const stateRefresh = () => {
      setCustomers("");
      setCompleted(0);
      callApi()
      .then(res => setCustomers(res))
      .catch(err => console.log(err));
   }

  useEffect(() => {
    const timer = setInterval(progress, 20);
    callApi()
      .then(res => setCustomers(res))
      .catch(err => console.log(err));
  }, [])

  const callApi = async () => {
    const response =await fetch('/api/customers');
    const body = await response.json();
    return body
  }

  const progress = () => {
    setCompleted(completed >= 100 ? 0 : completed + 1)
  }

  return (
    <>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
            <TableCell>설정</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { customers ?      // rendered before get response
          // console.log(customers)
          customers.map((customer) => {
            return <Customer 
                      key={customer.id} 
                      id={customer.id}
                      image={customer.image}
                      name={customer.name}
                      birthday={customer.birthday}
                      gender={customer.gender}
                      job={customer.job}
                      stateRefresh={stateRefresh} />
          })
          :
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress variant="determinate" value={completed} />
            </TableCell>
          </TableRow>
        }
        </TableBody>
      </Table>
    </Paper>
    <CustomerAdd stateRefresh={stateRefresh} />
    </> 
  );
}

export default withStyles(styles)(App);
