import "./Profile.css";
import { useState, useEffect } from "react";
// import logo from "../../assets/logoName.webp";
import logo from "../assets/image.png";

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("access_token");
  console.log("TOKEN:", accessToken);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId || !accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8000/api/user/profile/${userId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Server error:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProfile(data);
           console.log("PROFILE DATA:", data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
 
    fetchProfile();
  }, [userId, accessToken]);

  return (
    <section className="profile-page">
      <div className="profile-container">
        {loading ? (
          <div className="profile-loading">Loading...</div>
        ) : profile ? (
          <>
            <div className="profile-image">
              <img
                src={
                  profile.avatar
                    ? `http://localhost:8000${profile.avatar}`
                    : logo
                }
                alt={profile.username}
              />
            </div>

            <div className="profile-details">
              <h2><strong>Name: </strong> {profile.username}</h2>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Phone:</strong> {profile.phone_number}</p>
            </div>
          </>
        ) : (
          <div className="profile-error">Profile not found</div>
        )}
      </div>
    </section>
  );
}
