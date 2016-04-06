import { PropTypes } from 'react'
import React from 'react'

export default function TodoListItem (props) {
  const onDelete = () => {
    props.onDelete(props.id)
  }
  const onToggle = () => {
    props.onToggle(props.id, !props.active)
  }

  return (
    <li key={props.id}style={{ cursor: 'pointer' }}>
      <span onClick={onToggle} style={!props.active ? { textDecoration: 'line-through' } : {}}>{props.text}</span>
      <button onClick={onDelete} className='btn btn-danger'>Delete</button>
    </li>
    )
}
TodoListItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
}
