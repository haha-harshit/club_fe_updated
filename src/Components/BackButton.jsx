import React from 'react'
import '../Styles/Components/BackButton.css'
const BackButton = () => {
  const handleBack= ()=>{
    window.history.back()
  }
 
    return (
    <button  onClick={()=>{
        handleBack()
    }} className='back-button-style'><i class="fa-solid fa-angles-left"></i> Back</button>
  )
}

export default BackButton