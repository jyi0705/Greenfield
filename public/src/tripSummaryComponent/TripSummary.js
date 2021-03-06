import React, { Component } from 'react'
import TripSummarySideDrawer from './TripSummarySideDrawer'
import ActivityList from './ActivityList'
import NearbyHotels from './NearbyHotels'
import EditButton from './EditButton'
import axiosRoutes from './TripSummaryAxiosRoutes'
import { Redirect } from 'react-router-dom'
import GMapQuerySelect from './GMapQuerySelect'
import GoogleMap from './GoogleMap'
<<<<<<< HEAD
import PendingList from './PendingList'
import Divider from 'material-ui/Divider';
//title, destionation, startdate, enddate, isCompleted, userId
const trip = {
  id:1,
  destination: 'Paris',
  startDate: '10/25/2017',
  endDate: '10/27/2017',
  userId: 1
}

=======
>>>>>>> 9a69bd9a3eb3e97615c4ff8a6aaafc62c1aaab86


class TripSummary extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isTripCreator: false,
      tripData: {},
      querySelection:'',
      topHotel: [],
      topActivities: [],
      toggle: false
    }
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.getTopHotel = this.getTopHotel.bind(this)
    this.getTopActivities = this.getTopActivities.bind(this)
    this.toggleHandler = this.toggleHandler.bind(this)
  }

  componentDidMount() {
    axiosRoutes.getTripData(this.props.match.params.tripId)
      .then((res) => {
      // fix this to show edit button if the event creator id is the same as the user id
      // if(res.data[0].id === this.props.userId) {
        this.setState({ isTripCreator: true }, () => {
          this.setState({ tripData: Object.assign(this.state.tripData, res.data[0]) }, () => {
          })
        })
      // } else {
      //   this.setState({ tripData: Object.assign(this.state.tripData, res.data[0]) }, () => {
      //     })
      // }
      })
      .catch(err => console.log(err))
    
    // need this to get the info to render on the DOM
    // because of issues with google maps
    // dont take this out if you want your data to render on events page
    window.setTimeout(() => {
      this.setState({
        toggle: !this.state.toggle
        })
    }, 1000)
  
  }
  // use to manipulate the tripsummary toggle state which is getting passed down to 
  // all of the other child components to make them render the most up to date
  // info from the database. The toggle fires the child components 
  // componentWillReceiveProps function
  toggleHandler() {
    this.setState({
      toggle: !this.state.toggle
    })
  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
  // used to get the right data when user clicks a different event page from
  // the current event page
  componentWillReceiveProps(nextProps) {
    axiosRoutes.getTripData(nextProps.match.params.tripId)
      .then((res) => {
        if(res.data.userId === nextProps.userId) {
          this.setState({
            isTripCreator: true
          })
        }
        this.setState({
          tripData: res.data[0]
        })
      })
      .catch(err => console.log(err))

  }

  // routes the user to the edit page to edit a trip info
  handleEditButtonClick() {
    this.goTo.call(this, `edit/${this.state.tripData.id}`)
  }
  // gets the top hotels from the nearbyHotel.js child component axios call
  getTopHotel(topHotelArr) {
    console.log('top hotels', topHotelArr)
    console.log(topHotelArr)
    
    this.setState({
      topHotel: topHotelArr
    })
  }
  // gets the top activities from the ActivityList.js child component axios call
  getTopActivities(topActivitiesArr) {
    this.setState({
      topActivities: topActivitiesArr
    })
  }

  render() {    
    const { isAuthenticated } = this.props.auth
    // used to make sure the user is logged in before render the page to the user
    // if not redirect to home page
    if(!isAuthenticated()) {
      return (
        <Redirect to={{
        pathname: '/'
        }}/>
      )
    }

    let editButton = null
    // shows the edit button is the user is the trip creator
    if(this.state.isTripCreator) {
      editButton = <EditButton handleEditButtonClick={this.handleEditButtonClick} />
    }
    
    return (
      <div>
        <h2 style={{marginTop: 20 + "px", marginLeft: 10 + "px"}}>{this.state.tripData.title}</h2>
        <div style={{borderRadius: 1 + "px", marginTop: -31 + "px", marginLeft: 20 + "px", width: 96 + "%", backgroundImage: `url(${this.state.topHotel.url})`, backgroundSize: 'cover'}}>
          <br></br>
        </div>
        <br></br>
        <h5 style={{marginLeft: 65 + "%", marginTop: -25 + "px"}}>{this.state.tripData.destination} | {this.state.tripData.startDate} - {this.state.tripData.endDate}</h5>
        <Divider />
        <GoogleMap
          tripId={this.props.match.params.tripId}
          toggleHandler={this.toggleHandler}
        />
<<<<<<< HEAD
      <ConfirmedFriends 
=======
      
      {editButton}
      <TripSummarySideDrawer 
>>>>>>> 9a69bd9a3eb3e97615c4ff8a6aaafc62c1aaab86
        tripId={this.state.tripData.id}
        userId={this.props.userId}
        topHotel={this.state.topHotel}
        topActivities={this.state.topActivities}
        toggle={this.state.toggle}
        toggleHandler={this.toggleHandler}
      />
      
      {editButton}

      <ActivityList 
        tripId={this.state.tripData.id}
        userId={this.props.userId}
        creatorId={this.state.tripData.userId}
        getTopActivities={this.getTopActivities}
        toggle={this.state.toggle}
      />
      <NearbyHotels
        tripId={this.state.tripData.id}
        userId={this.props.userId}
        creatorId={this.state.tripData.userId}
        getTopHotel={this.getTopHotel}
        toggle={this.state.toggle}
      />
      

      </div>
    )

  }
}

export default TripSummary
<<<<<<< HEAD
           
=======
>>>>>>> 9a69bd9a3eb3e97615c4ff8a6aaafc62c1aaab86
