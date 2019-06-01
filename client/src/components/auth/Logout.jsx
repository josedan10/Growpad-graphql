import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

// actions
import { logout } from '../../store/actions/auth'

const Logout = ({ logout, history, ...rest }) => {
  // Check token here
  logout()
  history.push('/login')

  return (
    'Loging out...'
  )
}

Logout.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => { dispatch(logout()) }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))
