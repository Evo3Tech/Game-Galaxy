import { Outlet, useNavigate } from "react-router-dom"
import "../../../../css/user_page/profile.css"
import NavProfile from "./NavProfile"




export default function Userprofile() {
    const navigate = useNavigate()

  return (
    <div className="User-container">
        <div className="userinfo">
            <NavProfile/>
            <Outlet />
        </div>


      <div className="userprofile">
        <h3>Jessica Jones</h3>
        <p className="position">Part Of Game Galaxy</p>

        <div className="profile-stats">
          <div>
            <h4>22</h4>
            <p>Friends</p>
          </div>
          <div>
            <h4>10</h4>
            <p>Favorite game</p>
          </div>
          <div>
            <h4>89</h4>
            <p>Comments</p>
          </div>
        </div>
        <p className="quote">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ullam in officiis omnis enim aliquam laborum voluptatem, 
        reprehenderit quibusdam tempore officia reiciendis optio, tempora odio nam labore, esse iusto inventore!
        </p>
      </div>

    </div>
  )
}
