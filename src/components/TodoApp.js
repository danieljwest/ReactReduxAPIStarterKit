import React from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

export default class TodoApp extends React.Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { list: [{ text: 'My First Todo', active: true }], text: '' }
  }
  handleDelete (id) {
    const array = [...this.state.list]
    array.splice(id, 1)
    this.setState({ list: array })
  }
  handleToggle (id, active) {
    const array = [...this.state.list]
    const item = Object.assign({}, this.state.list[id], { active })
    array.splice(id, 1, item)
    this.setState({ list: array })
  }
  handleTextChange (text) {
    this.setState({ text })
  }
  handleSubmit (e) {
    e.preventDefault()
    const array = [...this.state.list, { text: this.state.text, active: true }]
    this.setState({ list: array, text: '' })
  }
  render () {
    return (
      <div className='container text-center'>
        <TodoList onToggle={this.handleToggle} onDelete={this.handleDelete} list={this.state.list} />
        <TodoForm text={this.state.text} onSubmit={this.handleSubmit} onChange={this.handleTextChange} />
      </div>)
  }
}
