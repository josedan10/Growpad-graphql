import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ApolloConsumer } from 'react-apollo'
import PropTypes from 'prop-types'

// actions
import { setUserProfile } from '../../../store/actions/user'

// query
import ProfileQuery from '../../../gql/queries/profile.gql'

// default profile pictures
import maleDefault from '../../../assets/male-default.svg'
import femaleDefault from '../../../assets/female-default.svg'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  render () {
    let { profile, setUserProfile } = this.props
    return (
      <ApolloConsumer>
        { client => {
          if (profile) {
            return (
              <div className='profile-info'>
                <h3 className='username'>{profile.username}</h3>
                <img src={(profile.sex === 'M' ? maleDefault : femaleDefault)} />
              </div>
            )
          } else {
            client.query({
              query: ProfileQuery
            })
              .then(response => setUserProfile(response.data.profile))
              .catch(error => console.log(error))
          }
        }
        }
      </ApolloConsumer>
    )
  }
}

const mapToStateToProps = (state) => ({
  profile: state.user.profile
})

const mapToDispatchToProps = (dispatch) => ({
  setUserProfile: (profile) => { dispatch(setUserProfile(profile)) }
})

export default connect(mapToStateToProps, mapToDispatchToProps)(Profile)
