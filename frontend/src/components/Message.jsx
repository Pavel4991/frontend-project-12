const Message = (props) => {
  const { username, body } = props

  return (
    <div className="text-break mb-2">
      <b>{username}</b>: {body}
    </div>
  )
}

export {Message}