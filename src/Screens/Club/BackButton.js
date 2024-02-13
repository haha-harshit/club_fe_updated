import React from 'react';
import { navigate } from '@reach/router'; // If using @reach/router

const BackButton = () => {
  const goBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <button onClick={goBack} style={{ position: 'fixed', top: '20px', left: '20px' , backgroundColor:"rgba(255,255,255,0.02)",borderWidth:1,borderColor:"#ccc",border:"1px solid #ccc"}}>
      <i className="fa fa-arrow-left"></i> Back
    </button>
  );
};

export default BackButton;
