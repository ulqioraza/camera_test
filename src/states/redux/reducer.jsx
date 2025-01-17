let initialState = {
  systemname: 'inventory',
  lang: "en",
  dir: "ltr",
  dataThemeMode: "light",
  dataMenuStyles: "light",
  dataNavLayout: "horizontal",
  dataHeaderStyles: "color",
  dataVerticalStyle: "overlay",
  toggled: "",
  dataNavStyle: "menu-click",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "default",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  loader: "disable",
  iconOverlay: "",
  colorPrimaryRgb: "0, 40, 80",
  colorPrimary: "",
  bodyBg1: "",
  bodyBg2: "",
  Light: "",
  Formcontrol:"",
  inputBorder: "",
  Graycolor: "",
  bgImg: "",
  iconText: "",
  body: "",
  userAuthen: { username: 'Login Please', userpermission: [], expiredate: null, isauthen: false },
}

const loadUserAuthenFromLocalStorage = () => {
  const storedState = localStorage.getItem(`${initialState.systemname}-userauthenstate`)
  const jsonObj = storedState ? JSON.parse(storedState) : initialState.userAuthen
  if (jsonObj.expiredate) {
    const now = new Date()
    const expireDate = new Date(jsonObj.expiredate)
    if (now > expireDate) {
      return initialState.userAuthen
    } else {
      return jsonObj
    }
  } else {
    return initialState.userAuthen
  }
}
initialState.userAuthen = loadUserAuthenFromLocalStorage()

export default function reducer(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case "ThemeChanger":
      state = payload
      return state
      break;
    case "SetUserAuthen":
      const newUserAuthen = { ...state.userAuthen, ...payload }
      state = { ...state, userAuthen: newUserAuthen }
      localStorage.setItem(`${initialState.systemname}-userauthenstate`, JSON.stringify(newUserAuthen))
      return state
      break;
    break;
      default:
      return state;
  }
}