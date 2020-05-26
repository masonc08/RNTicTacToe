import React from 'react'
import './Button.css'

export default function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.children}
    </button>
  )
}