export const getOnClickSaveMessageButton = ({ getMessageValue, parseMessage, saveMessage }) => {
  return () => {
    const { message } = getMessageValue()
    const { parsedMessage } = parseMessage({ message })
    saveMessage({ parsedMessage })
  }
}

export default {}

