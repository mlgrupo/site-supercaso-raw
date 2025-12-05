import React, { useRef, useEffect } from 'react';
import './InstagramCard.css';
import ramoInstaE from '../../imgs/ramo-vinho-e.svg';
import ramoInstaD from '../../imgs/ramo-vinho-d.svg';
import verificado from '../../imgs/verificado.svg';
import useCountUp from '../../hooks/useCountUp';

const InstagramCard = ({ 
  username, 
  profileImage, 
  posts, 
  followers, 
  following,
  className = '',
  animateNumbers = false
}) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  // Intersection Observer para detectar quando o card entra na viewport
  useEffect(() => {
    if (!animateNumbers) return;

    const currentCard = cardRef.current;
    if (!currentCard) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Anima quando 30% do card está visível
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(currentCard);

    return () => {
      observer.unobserve(currentCard);
    };
  }, [animateNumbers]);

  // Usar o hook de animação apenas se animateNumbers for true e o card estiver visível
  const animatedPosts = useCountUp(posts, 2000, animateNumbers && isVisible);
  const animatedFollowers = useCountUp(followers, 2000, animateNumbers && isVisible);
  const animatedFollowing = useCountUp(following, 2000, animateNumbers && isVisible);

  // Usar valores animados ou originais
  const displayPosts = animateNumbers ? animatedPosts : posts;
  const displayFollowers = animateNumbers ? animatedFollowers : followers;
  const displayFollowing = animateNumbers ? animatedFollowing : following;

  return (
    <div ref={cardRef} className={`card ${className}`}>
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
                <span className="value">{displayPosts}</span>
                <span className="label">Posts</span>
              </div>
            )}
            {followers !== undefined && (
              <div className="stat">
                <span className="value">{displayFollowers}</span>
                <span className="label">Seguidores</span>
              </div>
            )}
            {following !== undefined && (
              <div className="stat">
                <span className="value">{displayFollowing}</span>
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

