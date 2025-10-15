const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const { classType, message } = notification

  return (
    <div className={classType}>
      {message}
    </div>
  )
}

export default Notification