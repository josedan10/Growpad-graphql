/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'

export default class Loader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }

    this.toggleLoad = this.toggleLoad.bind(this)
  }

  componentWillMount () {
    window.addEventListener('load', this.toggleLoad)
  }

  toggleLoad () {
    this.setState(prevState => ({
      ...prevState,
      loading: !prevState.loading
    }))
  }
  
  render () {
    return (
      (this.state.loading) &&
      <div className='loader-container'>
        <div className='loader' />
      </div>
    )
  }
}
