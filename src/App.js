import React from 'react';
import './App.css';
import Customer from './components/Customer'



function App() {
  const customers = [{
  id: 1,
  image: 'https://placeimg.com/64/64/1',
  name: '나동빈',
  birthday: '961222',
  gender: '남자',
  job: '대학생'
},
{
  id: 2,
  image: 'https://placeimg.com/64/64/2',
  name: '홍길동',
  birthday: '941222',
  gender: '남자',
  job: '백수'
},
{
  id: 3,
  image: 'https://placeimg.com/64/64/3',
  name: '김만두',
  birthday: '482920',
  gender: '여자',
  job: '코더'
}]

  return (
    <>
    {
      customers.map((customer) => {
        return <Customer 
                  key={customer.id} 
                  id={customer.id}
                  image={customer.image}
                  name={customer.name}
                  birthday={customer.birthday}
                  gender={customers.gender}
                  job={customer.job} />
      })
    }
    </> 
  );
}

export default App;
