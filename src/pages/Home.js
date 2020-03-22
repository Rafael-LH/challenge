import React, {Component} from 'react'

import Registers from '../components/Registers'
import Repositories from '../components/ModalRepositories'


export default class Home extends Component{

  constructor(props){
    super(props)
    this.state = {
        data: []
    }
  }

  async componentDidMount(){
    const response = await fetch(`/users`);
    const { data } = await response.json()
    this.setState({
      data: data
    })
  }
  
  render(){
   return(
     <div className='container'>
     {
      this.state.data.map(element => ( <Registers key={element.id} {...element} /> ) )
     }
     </div>
   )
  }
}