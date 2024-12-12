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
import Categorys from './components/user_page/home_page/Categorys.jsx'

import GameView from './components/user_page/home_page/GameView.jsx'
import Userprofile from './components/user_page/home_page/Profile/Userprofile.jsx'
import Settings from './components/user_page/home_page/Settings.jsx'
import Freinds from './components/user_page/home_page/Profile/Freinds.jsx'
import Usercomments from './components/user_page/home_page/Profile/Usercomments.jsx'
import CommentsLiked from './components/user_page/home_page/Profile/CommentsLiked.JSX'
import Error_page from './components/hero_page/Error_page.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error_page/>,
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
    errorElement: <Error_page/>,
    children: [
      {
        index : true,
        element: <HomePage/>
      },
      {
        path: "profile",
        element: <Userprofile/>,
        children:[
          {
            index:true,
            element: <Freinds/>
          },
          {
            path: "comments",
            element: <Usercomments/>
          },
          {
            path: "likes",
            element: <CommentsLiked/>
          }
        ]
      },
      {
        path: "settings",
        element: <Settings/>
      },
      {
        path: "category",
        element: <Categorys />
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
