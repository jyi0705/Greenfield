const Sequelize = require('sequelize')
const db = require('../config.js')



const Trips = db.define('trips',{
  ID: Sequelize.INTEGER,
  USER_ID:Sequelize.INTEGER,
  USER_ID_VOTERS: Sequelize.INTEGER[][],
  TITLE: Sequelize.STRING,
  DESTINATION: Sequelize.STRING,
  HOTELS: Sequelize.STRING[][],
  ACTIVITIES: Sequelize.STRING[],
  START_DATE: Sequelize.DATE,
  END_DATE: Sequelize.DATE,
  IS_COMPLETED: Sequelize.BOOLEAN
})

Trips.sync()

module.exports = Trips

// CREATE TABLE HOTEL (
//   ID INT NOT NULL,
//   H_NAME string[],
//   H_Count integer[],
//   P_ID string,
//   primary key (ID)
// )

// CREATE TABLE TRIPS (
//   ID INTEGER,
//   USER_ID integer,
//   USER_ID_VOTERS integer[][],
//   TITLE string,
//   DESTINATION string,
//   DESCRIPTION string,
//   HOTELS string[][],
//   ACTIVITIES string[],
//   START_DATE date,
//   END_DATE date,
//   IS_COMPLETED boolean
// )

// CREATE TABLE USERS (
//   ID integer,
//   USER_NAME string,
//   PW string,
//   EMAIL string,
//   PRO_PIC string,
//   UPCOMING_TRIPS string[],
//   RESOLVED_TRIPS string[],
//   FIRST_NAME string,
//   LAST_NAME string,
//   FRIENDS string[]
// )

// INSERT INTO EXAMPLETABLE
// VALUES('MANISA',
// '{1,2,3,4'},
// '{{')