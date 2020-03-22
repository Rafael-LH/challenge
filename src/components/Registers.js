import React, {Component} from 'react'
import ModalRepositories from './ModalRepositories'
import ModalCommits from './ModalCommits'

export default class Cards extends Component{

  constructor(props){
   super(props);
    this.state = {
      showRepositories: false,
      showCommits: false,
      dataAuthor: {},
      dataRepositories: [],
      dataCommits: [],
    }
  }
  getUrl = async () => {
   const response = await fetch(`/users/${this.props.login}`)
   const { data } = await response.json()
   this.setState({
     dataRepositories: data,
     showRepositories: true
    })
  }
  closeModal = () => {
    this.setState({
      showRepositories: false,
      showCommits: false,
    })
  }

  handleSearch = async (e) => {
    const {username, namerepo} = e.target.dataset;
    const response = await fetch(`/users/${username}/${namerepo}`)
    const { data } = await response.json()
    
    this.setState({
      showRepositories: false,
      showCommits: true,
      dataCommits: data,
    })
    this.setState({
      dataAuthor: {
        name: this.state.dataCommits[0].commit.author.name,
        email: this.state.dataCommits[0].commit.author.email,
      }
    })
  }

 render(){
  return(
    <div className='container__card'>
       <img src={this.props.avatar_url} alt="Avatar" />
       <h1>{this.props.login}</h1>
       <p><b>GitHub</b></p>
       <a target='__blank' href={this.props.html_url}>{this.props.html_url}</a>
       <div className='container__card--url'>
         <button className='btn-show-repo' onClick={this.getUrl}>Repositorios</button>
       </div>
       {
        this.state.showRepositories && 
        <div className='container-modal'>
          <div className='container-modal-repos'> 
            <button className='btn-close-modal' onClick={this.closeModal}>X</button>
            {
             this.state.dataRepositories.map(item => ( <ModalRepositories key={item.id} {...item} handleSearch={this.handleSearch} handleSearch={this.handleSearch}/> ) )
            }
          </div>
        </div>
     
       }
       {
        this.state.showCommits && 
        <div className='container-modal'>
          <div className='container-modal-repos content-commits'> 
            <button className='btn-close-modal' onClick={this.closeModal}>X</button>
            <ul className='container-commits'>
              <li className='container-commits__user'>
                <p><b>Nombre Autor:</b> {this.state.dataAuthor.name}</p>              
                <p><b>Email:</b> {this.state.dataAuthor.email}</p>              
              </li>
              <li>
                <h1>Historial Commits</h1>
              </li>
              {
                this.state.dataCommits.map(item => <ModalCommits key={item.sha} {...item} /> )  
              }
            </ul>
          </div>
        </div>
       }
    </div>
  )
 }
}