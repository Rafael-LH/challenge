import React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

const Modal = ({ handleClose, children, contentCommits }) => {

 // el primer parametro es la clase principal que tendra mi componente y el segundo parametro (que es un objeto) son las
// clases que te van a estar llegando por props
 const modalClass = classNames('container-modal__info', {
  contentCommits,
 })

return (
 createPortal(
   <div className='container-modal'>
    <div className={modalClass}> 
      <button className='btn-close-modal' onClick={handleClose}>X</button>
      { children }
    </div>
   </div>,
   document.getElementById('modal')
  )
 )
}
export default Modal
