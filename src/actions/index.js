export const toggleModal = (data) => {
  return {
    type: "TOGGLE_MODAL",
    payload: data
  }
};

export const signOut = (data) => {
  return {
    type: "SIGN_OUT"
  }
};

export const changeName = (data) => {
  return {
    type: "CHANGE_NAME",
    payload: data
  }
};

export const signupUser = (data) => {
  return {
    type: "SIGN_UP",
    payload: {
      userName: data.name,
      email: data.email,
      token: data.access_token,
    }
  }
};
