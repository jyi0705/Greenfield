import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FriendsList from './FriendsList'
import EventPage from '../EventPageComponent/EventPage'

class Create extends Component {
  constructor(){
    super()
    this.state = {

      // hideInvite: false,

      fromDate: '',

      toDate: '',

      showInvite: true,
//Invited Friends storage
      friends: [],

      display: false,

      displayEventPage: false,
//Trip info
      tripName: '',

      location: '',

      description: '',

      dummyData: [{
        name: "Jose"
      },{
        name: "Han Solo"
      },{
        name: "Jay is cool"
      }]
    }
    
    this.inviteFriends = this.inviteFriends.bind(this)
    this.uninviteFriend = this.uninviteFriend.bind(this)
    this.invite = this.invite.bind(this)
    this.done = this.done.bind(this)
    this.eventFromDate = this.eventFromDate.bind(this)
    this.eventToDate = this.eventToDate.bind(this)
    this.finalize = this.finalize.bind(this)
    this.tripNameData = this.tripNameData.bind(this)
    this.locationNameData = this.locationNameData.bind(this)
    this.descriptionData = this.descriptionData.bind(this)
    // this.hideInvite = this.hideInvite.bind(this)
  }

  // hideInvite(){
  //   if(this.state.hideInvite === false){
  //   this.setState({hideInvite: true})
  //   console.log('hideInvite')
  //   } else {
  //   this.setState({hideInvite: false})
  //   }
  // }

  login() {
    this.props.auth.login();
  }

//Invite Frinends Button
  inviteFriends(){
    this.setState({display: true})
  }

//Uninvite Friends button
  uninviteFriend(friend){
    for(var i = 0; i < this.state.friends.length; i++) {
      if(friend === this.state.friends[i]) {
        this.state.friends.splice(i, 1)
        this.setState({friends: this.state.friends})
      }
    }
    console.log(this.state.friends)
    console.log(friend + ' was uninvited')
  }

//Invite friends list invite button
  invite(friend){
    for (var i = 0; i < this.state.friends.length; i++) {
      if (friend.name === this.state.friends[i]) {
        return alert('Friend already invited')
      }
    }
    console.log('Clicked on friend')
    console.log(friend)
    this.state.friends.push(friend.name)
    this.setState({
      friends: this.state.friends
    })
  }

//When finished inviting friends Button
  done(){
    this.setState({display: false})
    console.log(this.state.friends)
  }

  eventFromDate(events) {
    this.setState({fromDate: events.target.value})
    console.log(this.state.fromDate)
  }

  eventToDate(events) {
    this.setState({toDate: events.target.value})
    console.log(this.state.toDate)
  }

  finalize() {
    if (this.state.displayEventPage === false){
    this.setState({displayEventPage: true})
    } else {
      this.setState({displayEventPage: false})
    }
  }

  tripNameData(events) {
    this.setState({tripName: events.target.value})
    console.log('Trip Name: ',events.target.value)
  }

  locationNameData(events) {
    this.setState({location: events.target.value})
    console.log('Location: ',events.target.value)
  }

  descriptionData(events) {
    this.setState({description: events.target.value})
    console.log('Description: ',events.target.value)
  }

  render() {

//Invite Friends List on "Invite Friends" click



    if (this.state.display === true) {
      return (
      <div>
        <h1>Friends List</h1>
        <FriendsList 
        friends = {this.state.dummyData} 
        invite = {this.invite}
        done = {this.done}
        hideInvite = {this.hideInvite}
        />
      </div>
      )
  }

  if (this.state.displayEventPage === true) {
    return (
      <div>
        <EventPage 
        tripName={this.state.tripName} 
        location={this.state.location} 
        description={this.state.description} 
        toDate={this.state.toDate}
        fromDate={this.state.fromDate}
        friends={this.state.friends}
        displayEventPage={this.finalize}
        />
      </div>
    )
  }


const { isAuthenticated } = this.props.auth;
    return (

      //if Authenticated ? render : do not render
      <div>
        {
        isAuthenticated() && (
            
            

        <div>
          <div id="topHalf">
            <h2>Create Trip</h2>
            <input id="tripName" type = 'text' placeholder = "Trip name" onChange={this.tripNameData}></input>
          <br></br>
            <input id="location" type = 'text' placeholder = 'Location/Address' onChange={this.locationNameData}></input>
          <br></br>
            <textarea name="description" placeholder ="Description Details" onChange={this.descriptionData}></textarea>
          </div>

          <div id="bottomHalf">
            {/*Dropdown calendars*/}
            <span>From:</span>
            <input type="date" onChange={this.eventFromDate}/>
            <span> To:</span>
            <input type="date" onChange={this.eventToDate}/>
            <br></br>
            
            {/*Invite friends pop up*/}
            <button className="btn" onClick={this.inviteFriends}>Invite Friends</button>
            <br></br>
            <button className="finalize" onClick = {this.finalize}>Finalize Trip</button>
          </div>

          {/*Render Invited Friends*/}
          <div id="invitedFriends">
            <Friends friends={this.state.friends} uninviteFriend={this.uninviteFriend} />
          </div> 

        </div>

        ) //isAuthenticated end parenthesis
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    ) 

  } //end render bracket
} //end Create component bracket

//Render invited friends onto Create Page
const Friends = ({friends, uninviteFriend}) => (
  <div>
  {friends.map((friend, key) => {
    return <div>
    <p>{friend}
    <button className="uninvite" onClick={() => {uninviteFriend(friend)}}>Uninvite</button>
    </p>
    </div>
  })
  }
  </div>
)

export default Create