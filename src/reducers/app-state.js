const initialState = {
  showModal: false,
  modalName: '',
  logged: false,
  userName: '',
  email: 'Test Email',
  token: ''
}
export default function appState(state=initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return Object.assign({}, state, {
            showModal: !state.showModal,
            modalName: action.payload
        })
    case 'SIGN_OUT':
      return Object.assign({}, state, {
            logged: false
          })
    case 'CHANGE_NAME':
    console.log(action.payload)
      return Object.assign({}, state, {
            userName: action.payload,
            logged: true
          })
    case 'SIGN_UP':
      return Object.assign({}, state, {
          userName: action.payload.userName,
          email: action.payload.email,
          logged: true,
          token: action.payload.token
      })
    default:
      return state;
  }
}
