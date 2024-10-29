import React from 'react';
import { useParams } from 'react-router-dom';
import useOrchidData from '../Data/data'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Detail.css';

const Detail = ({ theme }) => {
  const { id } = useParams();
  const { orchids, loading, error } = useOrchidData(); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!orchids || orchids.length === 0) {
    return <p>No orchids available.</p>;
  }

  const orchid = orchids.find((orchid) => orchid.id === id);

  if (!orchid) {
    return <p>Orchid not found.</p>;
  }

  const specialTextColor = theme === 'dark' ? 'white' : 'black';

  return (
    <div className="container">
      <div className="orchid-info">
        <div className="orchid-img">
          <img src={orchid.image} alt={orchid.orchidName} />
        </div>
        <div className="orchid-detail">
          <h1 className="orchid-name">{orchid.orchidName}</h1>
          <h2 style={{ color: specialTextColor }}>Natural: {orchid.isNatural ? 'Yes' : 'No'}</h2>
          <div className="category-rating">
            <h2 className="orchid-category">Category: {orchid.category}</h2>
          </div>
          <h2 className="orchid-price">Description</h2>
          <p className="orchid-info">{orchid.description}</p>
          {orchid.videoUrl && (
            <div className="video-container">
              <h2>Watch Video</h2>
              <iframe
                width="100%"
                height="315"
                src={orchid.videoUrl}
                title="Orchid Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
