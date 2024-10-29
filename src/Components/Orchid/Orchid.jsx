import './Orchid.css';
import useOrchidData from '../Data/data';
import { Link } from 'react-router-dom';

export const Orchid = () => {
  const { orchids, loading, error } = useOrchidData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center orchid-gallery-title">Orchid Gallery</h1>
      <div className="grid-container">
        {orchids.map((orchid) => (
          <div className="card" key={orchid.id}>
            <div className="img">
              <img className="orchid-img" src={orchid.image} alt={orchid.orchidName} /> 
            </div>
            <h2 className="name">{orchid.orchidName}</h2>
            <Link to={`detail/${orchid.id}`}>
              <button className="detail-button">Detail</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};