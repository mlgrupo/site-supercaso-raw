import React from 'react';
import './InstagramCard.css';
import ramoInstaE from '../../imgs/ramo-vinho-e.svg';
import ramoInstaD from '../../imgs/ramo-vinho-d.svg';
import verificado from '../../imgs/verificado.svg';

const InstagramCard = ({ 
  username, 
  profileImage, 
  posts, 
  followers, 
  following,
  className = '' 
}) => {
  return (
    <div className={`card ${className}`}>
      <div className="content">
        <div className="avatar">
          <img src={ramoInstaE} alt="Ramo Instagram E" />
          {profileImage && (
            <img 
              src={profileImage} 
              alt={`Perfil de ${username}`}
              className="img"
            />
          )}
          <img src={ramoInstaD} alt="Ramo Instagram E" />
        </div>
        <div className="info">
          <div className="user">
            <span className="username">{username}</span>
            <img src={verificado} alt="verificado" />
          </div>
          <div className="stats">
            {posts !== undefined && (
              <div className="stat">
                <span className="value">{posts}</span>
                <span className="label">Posts</span>
              </div>
            )}
            {followers !== undefined && (
              <div className="stat">
                <span className="value">{followers}</span>
                <span className="label">Seguidores</span>
              </div>
            )}
            {following !== undefined && (
              <div className="stat">
                <span className="value">{following}</span>
                <span className="label">Seguindo</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramCard;

