import React from 'react'

const AutorCommits = ( {children, name, email} ) => (
 <ul className='container-commits'>
  <li className='container-commits__user'>
    <p><b>Nombre Autor:</b> {name}</p>              
    <p><b>Email:</b> {email}</p>              
  </li>
  <li>
    <h1>Historial Commits</h1>
  </li>
  { children }
</ul>
)
export default AutorCommits;