import filter from 'leo-profanity'

const Message = (props) => {
  const { username, body } = props

  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :&nbsp;
      {filter.clean(body)}
    </div>
  )
}

export { Message }
