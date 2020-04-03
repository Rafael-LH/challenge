import React, {useEffect, useState} from 'react'
import ModalRepositories from './ModalRepositories'
import ModalCommits from './ModalCommits'

const Cards = ( { login, avatar_url, html_url, } ) => {
  const [state, setState] = useState({
    showRepositories: false,
    showCommits: false,
    dataAuthor: {
      name: null,
      email: null,
    },
    dataRepositories: [],
    dataCommits: [],
  })

  async function getUrl(){
    try {
      const response = await fetch(`/users/${login}`)
      const { data } = await response.json()
      setState({
        dataRepositories: data,
        showRepositories: true
      })
    } catch (error) {
      console.log(error.statusText);
    }
  }

  const closeModal = () => {
    setState({
      showRepositories: false,
      showCommits: false,
    })
  }

  const handleSearch = async (e) => {
    const {username, namerepo} = e.target.dataset;
    const response = await fetch(`/users/${username}/${namerepo}`)
    const { data } = await response.json()
    
    setState({
      showRepositories: false,
      showCommits: true,
      dataCommits: data,
      dataAuthor:{
        name:  data[0].commit.author.name,
        email: data[0].commit.author.email
      }
    })
  }

  return(
    <div className='container__card'>
       <img src={avatar_url} alt="Avatar" />
       <h1>{login}</h1>
       <p><b>GitHub</b></p>
       <a target='__blank' href={html_url}>{html_url}</a>
       <div className='container__card--url'>
         <button className='btn-show-repo' onClick={getUrl}>Repositorios</button>
       </div>
       {
        state.showRepositories && 
        <div className='container-modal'>
          <div className='container-modal-repos'> 
            <button className='btn-close-modal' onClick={closeModal}>X</button>
            {
             state.dataRepositories.map(item => ( <ModalRepositories key={item.id} {...item} handleSearch={handleSearch} handleSearch={handleSearch}/> ) )
            }
          </div>
        </div>
     
       }
       {
        state.showCommits && 
        <div className='container-modal'>
          <div className='container-modal-repos content-commits'> 
            <button className='btn-close-modal' onClick={closeModal}>X</button>
            <ul className='container-commits'>
              <li className='container-commits__user'>
                <p><b>Nombre Autor:</b> {state.dataAuthor.name}</p>              
                <p><b>Email:</b> {state.dataAuthor.email}</p>              
              </li>
              <li>
                <h1>Historial Commits</h1>
              </li>
              {
                state.dataCommits.map(item => <ModalCommits key={item.sha} {...item.commit} /> )  
              }
            </ul>
          </div>
        </div>
       }
    </div>
  )
}
export default Cards