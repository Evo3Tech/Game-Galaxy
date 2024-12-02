import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Hero_page } from './components/hero_page/Hero_page.jsx'
import { Login } from './components/hero_page/Login.jsx'
import { Signup } from './components/hero_page/Signup.jsx'
import { Provider } from 'react-redux'
import { store } from './redux_store/store.js'
import User_App from './components/user_page/UserApp.jsx'
import HomePage from './components/user_page/home_page/HomePage.jsx'
import GameView from './components/user_page/home_page/GameView.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Hero_page/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      }
    ]
  },
  {
    path: "/user_interface",
    element: <User_App />,
    children: [
      {
        index : true,
        element: <HomePage/>
      },
      {
        path: "profile",
        element: <>Profile</>
      },
      {
        path: "settings",
        element: <>settings</>
      },
      {
        path: "game/:id",
        element: <GameView/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </StrictMode>
)
