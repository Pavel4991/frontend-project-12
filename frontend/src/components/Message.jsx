import filter from 'leo-profanity'

const Message = (props) => {
  const { username, body } = props

  filter.loadDictionary('ru')

  return (
    <div className="text-break mb-2">
      <b>{username}</b>: {filter.clean(body)}
    </div>
  )
}

export {Message}