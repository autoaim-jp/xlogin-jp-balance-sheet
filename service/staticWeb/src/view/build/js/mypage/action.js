export const getOnClickSaveMessageButton = ({ saveMessage }) => {
  return () => {
    saveMessage()
  }
}

export const getOnClickDeleteMessageButton = ({ deleteMessage }) => {
  return () => {
    deleteMessage()
  }
}

export default {}

