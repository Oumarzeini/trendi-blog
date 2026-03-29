import { createStore, action } from "easy-peasy";

export default createStore({
  overlayOn: false,
  setOverlayOn: action((state, payload) => {
    state.overlayOn = payload;
  }),
  sidebarIsOpen: true,
  setSidebarIsOpen: action((state, payload) => {
    state.sidebarIsOpen = payload;
  }),
});
