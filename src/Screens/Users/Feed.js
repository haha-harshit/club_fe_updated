
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Feed = ({ onSendMessage, onClose }) => {
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(true)
  const userMobile = Cookies.get('userMobile')

  const postFeedMessage = async () => {
    if (userMobile && userMobile.length === 10) {
      try {
        if (message.length > 0) {
          const response = await axios.post('https://api.clubnights.fun/feed/feeds', {
            userMobile: userMobile,
            message: message,
          })
          if (response.data.success === true) {
            toast.success('Thanks for giving your feedback', { toastId: 'feed' })
            setTimeout(() => {
              onClose()
              setShowModal(false)
            }, 2000)
          } else {
            toast.info('Try after sometime, server issue', { toastId: 'no_feed' })
            setTimeout(() => {
              onClose()
              setShowModal(false)
            }, 2000)
          }
        } else {
          toast.warn('Kindly write the feedback!')
        }
      } catch (error) {
        // console.error('Error posting feed message:', error);
      }
    } else {
      toast.warn('Please login to make a feedback!')
    }
  }

  
  const modalStyle = {
    display: 'flex',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  }

 
  const modalContentStyle = {
    backgroundColor: '#fefefe',
    padding: '20px',
    border: '1px solid #888',
    borderRadius: '5px',
    overflow: 'hidden',
    width: '300px',
    height: '450px',
  }

  const closeStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }

  const textareaStyle = {
    width: '100%',
    border: '1px solid #ccc',
    color: '#000',
    padding: '10px',
    outline: 'none',
    resize: 'none',
    height: '280px',
    marginBottom: '10px',
  }

  const buttonStyle = {
    backgroundColor: '#ff82bf',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }

  
  return (
    <div className="feed-component">
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <span style={closeStyle} onClick={() => {
            onClose()
            setShowModal(false)
          }}>
            &times;
          </span>
          <h3 style={{ color: '#000' }}>Feedback</h3>
          <textarea
            style={textareaStyle}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            draggable={false}
          ></textarea>
          <button
            style={buttonStyle}
            onClick={() => {
              postFeedMessage()
            }}
          >
            <i class="fa-solid fa-paper-plane"></i> Send
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default Feed

