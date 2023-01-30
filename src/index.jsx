import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { Spin } from "antd"
import App from "./components/app/app"
import store, { persistor } from "./store/store"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate loading={<Spin />} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
)
