import React, {Component, useState, useEffect} from 'react'

import Registers from '../components/Registers'
const Home = () => {
  const [users, setUsers] = useState([])

  
  useEffect(() =>{

  async function fetchData(){
    try {
      const response = await fetch(`/users`);
      const { data } = await response.json()
      setUsers(data)
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();

  }, [])
  
  return(
     <div className='container'>
     {
      users.map(element => <Registers key={element.id} {...element} /> )
     }
     </div>
   )
}
export default Home