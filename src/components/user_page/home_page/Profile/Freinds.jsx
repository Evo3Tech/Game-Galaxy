import "./small.css";

export default function Freinds() {
  // Friends data
  const friends = [
    {
      id: 1,
      name: "Sif eddine Afram",
      avatar:
        "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
      status: "Online"
      },
    {
      id: 2,
      name: "John Doe",
      avatar:
        "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
        status: "Offline"
      },
    {
      id: 3,
      name: "Jane Smith",
      avatar:
        "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
        status: "Online"
      },
       {
      id: 3,
      name: "Jane Smith",
      avatar:
        "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
        status: "Online"
      },
      {
        id: 3,
        name: "Jane Smith",
        avatar:
          "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
          status: "Online"
        },
        {
          id: 3,
          name: "Jane Smith",
          avatar:
            "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
            status: "Online"
          },
  ];

  return (
    <div className="freinds">
      <div className="header">
        <h1>Freinds List</h1>
        </div>
      <hr />
      <div className="fixlayoute">
      {friends.map((friend) => (
        <div key={friend.id} className="freinds-list">
          <img src={friend.avatar} alt={friend.name} />
          <h3>{friend.name}</h3>
        </div>
      ))}
      </div>
    </div>
  );
}
