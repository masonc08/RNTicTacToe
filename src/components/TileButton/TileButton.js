import React from 'react'
import './TileButton.css'

export default function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.children}
    </button>
  )
}