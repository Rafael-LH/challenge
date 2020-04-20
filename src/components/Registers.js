import React, {useState} from 'react'
import Repositories from './Repositories'
import ModalCommits from './Commits'
import AutorCommits  from './AutorCommits'
import Modal from './Modal'

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

  const handleClose = () => {
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
        <Modal isOpen={state.showRepositories} handleClose={handleClose}>
          {
            state.dataRepositories.map(item => ( <Repositories key={item.id} {...item} handleSearch={handleSearch} /> ) )
          }
        </Modal>
       }

       {
        state.showCommits && 
          <div className='container-modal__info'> 
            <Modal handleClose={handleClose} contentCommits >
              <AutorCommits {...state.dataAuthor}>
                {
                  state.dataCommits.map(item => <ModalCommits key={item.sha} {...item.commit} /> )  
                }
              </AutorCommits>
            </Modal>
        </div>
       }
    </div>
  )
}
export default Cards