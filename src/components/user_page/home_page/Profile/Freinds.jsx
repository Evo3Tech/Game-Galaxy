import { useSelector } from "react-redux";
import "./small.css";

export default function Freinds() {
  const user = useSelector((state)=>state.user.info)
  
  const userFreinds= user.friends
  
  return (
    <div className="freinds">
      <div className="header">
        <h1>I follow :</h1>
      </div>
      <div className="fixlayoute">
        {
        userFreinds.length == 0 
        ? <span>You do not follow anyone</span> 
        :userFreinds.map((friend) => (
        <div key={friend.id} className="freinds-list">
          <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
           alt={friend.name} />
          <h3>{friend.name}</h3>
        </div>
      ))}
      </div>
    </div>
  );
}

