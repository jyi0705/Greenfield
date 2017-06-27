import React, { Component } from 'react'
import ConfirmedFriends from './ConfirmedFriends'
import ActivityList from './ActivityList'
import NearbyHotels from './NearbyHotels'
import EditButton from './EditButton'
import axiosRoutes from './TripSummaryAxiosRoutes'
import { Redirect } from 'react-router-dom'
import GMapQuerySelect from './GMapQuerySelect'
import GoogleMap from './GoogleMap'
import PendingList from './PendingList'
//title, destionation, startdate, enddate, isCompleted, userId
const trip = {
  id:1,
  destination: 'Paris',
  startDate: '10/25/2017',
  endDate: '10/27/2017',
  userId: 1
}



// trip summary will have tripid and userid passed in
class TripSummary extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isTripCreator: false,
      tripData: {},
      pendingList :[],
      querySelection:'',
      topHotel: [],
      topActivities: [],
      toggle: false
    }
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.handleAddToPending = this.handleAddToPending.bind(this)
    this.getTopHotel = this.getTopHotel.bind(this)
    this.getTopActivities = this.getTopActivities.bind(this)
    this.toggleHandler = this.toggleHandler.bind(this)
  }

  componentDidMount() {
    axiosRoutes.getTripData(this.props.match.params.tripId)
      .then((res) => {
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
    
    window.setTimeout(() => {
      this.setState({
        toggle: !this.state.toggle
        })
    }, 1000)
  
  }
  toggleHandler() {
    this.setState({
      toggle: !this.state.toggle
    })
  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

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

  handleEditButtonClick() {
    this.goTo.call(this, `edit/${this.state.tripData.id}`)
  }

  handleAddToPending(){
    this.state.pendingList.push(this.state.hotelClicked);
  }

  getTopHotel(topHotelArr) {
    console.log('top hotels', topHotelArr)
    console.log(topHotelArr)
    
    this.setState({
      topHotel: topHotelArr
    })
  }

  getTopActivities(topActivitiesArr) {
    this.setState({
      topActivities: topActivitiesArr
    })
  }

  render() {    
    const { isAuthenticated } = this.props.auth

    if(!isAuthenticated()) {
      return (
        <Redirect to={{
        pathname: '/'
        }}/>
      )
    }

    let editButton = null

    if(this.state.isTripCreator) {
      editButton = <EditButton handleEditButtonClick={this.handleEditButtonClick} />
    }
    
    return (
      <div>
        <h1>{this.state.tripData.title}</h1>
        <h4>{`Start Date: ${this.state.tripData.startDate} End Date: ${this.state.tripData.endDate}`}</h4>
        <p>{this.state.tripData.destination}</p>
        <GoogleMap
          tripId={this.props.match.params.tripId}
          toggleHandler={this.toggleHandler}
        />
      
      {editButton}
      <ConfirmedFriends 
        tripId={this.state.tripData.id}
        userId={this.props.userId}
        topHotel={this.state.topHotel}
        topActivities={this.state.topActivities}
        toggle={this.state.toggle}
        toggleHandler={this.toggleHandler}
      />
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
           