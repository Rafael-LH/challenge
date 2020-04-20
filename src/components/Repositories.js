import React, {Component} from 'react'

const Repositories = props => (
 <div className='container-modal-repos__card'>
    <h1>{props.name}</h1>
    <div className='container-modal-repos__info'>
      <p>Froks: {props.forks_count}</p>
      <p>Starts: {props.stargazers_count}</p>
    </div>
    <div className='container-modal-repos__commits'>
      <input type='button' 
             data-username={props.owner.login}
             data-namerepo={props.name}
             className='btn-commits'
             value='Commits' 
             onClick={props.handleSearch}  
             />
    </div>
 </div>
);
export default Repositories

  