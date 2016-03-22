import React from 'react'
import { Link } from 'react-router'

export default class Footer extends React.Component {
  render () {
    const toDate = new Date().getFullYear() > 2015 && '-' + new Date().getFullYear()
    return (
      <div>
        <hr/>
        <div className='text-center'>
          &copy; 2016{toDate}, This is really just an excuse to put stuff here
          | <Link to='/'>Home</Link> | <Link to='About'>About</Link>
        </div>
      </div>
    )
  }
}
