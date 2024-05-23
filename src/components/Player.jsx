import React, { useState } from 'react'

export default function Player({ initialName, symbol , isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(initialName)

  function handleEditClick (){
    setIsEditing(editing => !editing)
    if(isEditing){

      onChangeName(symbol, playerName)
    }
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>
  // let btnCaption = 'Edit'
  // if (isEditing) {
  //   btnCaption = 'Save'
  // }

  function handleChange(event){
    console.log(event)
    setPlayerName(event.target.value)

  }

  if(isEditing){
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
  }

  return (

    <li className={isActive ? 'active': undefined}>
      <span className="player">
        {editablePlayerName}
        
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>

  )
}
