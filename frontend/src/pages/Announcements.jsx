import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../api/announcements";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements()
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Failed to fetch announcements", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        <ul>
          {announcements.map((a) => (
            <li key={a._id} className="mb-2 p-2 border rounded">
              <h3 className="font-semibold">{a.title}</h3>
              <p>{a.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
