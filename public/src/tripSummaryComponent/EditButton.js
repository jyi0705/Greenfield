import React, { Component } from 'react'

// is the edit button click
const EditButton = ({handleEditButtonClick}) => (
  <div>
    <button onClick={handleEditButtonClick}>Edit Trip</button>
  </div>
)

export default EditButton