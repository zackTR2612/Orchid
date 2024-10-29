import React from 'react';
import useOrchidData from '../Data/data'; 
import { Link } from 'react-router-dom';
import './Special.css'; 

const Special = () => {
  const { orchids, loading, error } = useOrchidData(); 


  const specialOrchids = orchids.filter((orchid) => orchid.isSpecial);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="special-container">
      <h1>Special Orchids</h1>
      <div className="row">
        {specialOrchids.map((orchid) => (
          <div className="col-md-3" key={orchid.id}>
            <div className="card orchid-card">
              <div className="card-img-wrapper">
                <img src={orchid.image} alt={orchid.orchidName} className="card-img" />
              </div>
              <div className="card-body">
                <h5 className="orchid-name">{orchid.orchidName}</h5>
                <Link to={`/detail/${orchid.id}`} className="btn btn-primary">
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Special;