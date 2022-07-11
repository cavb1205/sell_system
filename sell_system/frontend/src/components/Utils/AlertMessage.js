import React from 'react'

const AlertMessage = ({message}) => {
  return (
    <div className="alert alert-info" role="alert">
        {message}
    </div>
  )
}

export default AlertMessage