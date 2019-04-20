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
    console.log('Cargando...')
    window.addEventListener('load', this.toggleLoad)
  }

  toggleLoad () {
    this.setState(prevState => ({
      ...prevState,
      loading: !prevState.loading
    }),
    () => console.log('Ready'))
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
