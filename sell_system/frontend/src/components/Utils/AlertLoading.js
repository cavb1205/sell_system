import React from 'react'

const AlertLoading = () => {
  return (
    <div className='text-center m-5'>
        <div className="spinner-grow spinner-grow-md text-primary my-5 mx-1" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-md text-primary my-5 mx-1" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-md text-primary my-5 mx-1" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default AlertLoading