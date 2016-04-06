import {PropTypes, default as React} from 'react'
import TodoListItem from './TodoListItem'

export default function TodoList (props) {
  const listItems = props.list.map((item, index) =>
    <TodoListItem key={index} onDelete={props.onDelete} onToggle={props.onToggle} id={index} {...item} />)
  return (
    <div className='row'>
      <ul>
        {listItems}
      </ul>
    </div>)
}
TodoList.propTypes = {
  list: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
}
