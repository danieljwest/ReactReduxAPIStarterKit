import {PropTypes, default as React} from 'react'

export default function TodoForm (props) {
  const handleTextChange = (event) => {
    props.onChange(event.target.value)
  }
  return (
    <form onSubmit={props.onSubmit} className='form-inline'>
      <div className='row form-group'>
        <input onChange={handleTextChange} type='text' value={props.text} className='form-control' />
        <button className='btn btn-success'>Add</button>
      </div>
    </form>)
}
TodoForm.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
