export const toggleModal = (name) => {
  return {
    type: "TOGGLE_MODAL",
    payload: name
  }
};

export const signOut = (name) => {
  return {
    type: "SIGN_OUT"
  }
};

export const changeName = (name) => {
  console.log(name)
  return {
    type: "CHANGE_NAME",
    payload: name
  }
};
