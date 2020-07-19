import React from 'react'


const buttonStyle = { 
    background: '#6F64F8',
    borderRadius: '5px',
    border:'none',
    margin: '4px 2px',
    opacity: 1,
    color: 'white',
    padding: '12px 25px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
  }
  

const Button = ({ClassnName, name}) => {
    return (
    <button style={buttonStyle}>{name}</button>
    )
}

export default Button
