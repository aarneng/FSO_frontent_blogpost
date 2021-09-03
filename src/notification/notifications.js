import React from "react"
import "./notification_styles.css"
import { connect } from "react-redux"

const Notification = ({ notification }) => {
  if (!notification) return null
  const name = "notification" + (notification.isError ? "-error" : "")

  return (
    <div className={name}>
      { notification.content }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
