const initialState = {
  showModal: false,
  modalName: '',
  logged: true,
  name: 'Test Name'
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
      return Object.assign({}, state, {
            name: action.payload
          })
    default:
      return state;
  }
}
