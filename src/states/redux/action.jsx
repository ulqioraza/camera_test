
export const ThemeChanger = (value) => async (dispatch) => {
  dispatch({
    type: "ThemeChanger",
    payload: value,
  })
}

export const SetUserAuthen = (value) => async (dispatch) => {
  dispatch({
    type: "SetUserAuthen",
    payload: value,
  })
}