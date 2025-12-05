import React from 'react';
import InstagramCard from '../../components/InstagramCard/InstagramCard';
import { clients } from '../../data/clients';
import './ClientsSection.css';

const ClientsSection = () => {
  return (
    <section className="clients" data-section-name="clients">
      <div className="container">
        <div className="header-client">
          <h2 className="title">
            SE VOCÊ JÁ TRABALHA COM HARMONIZAÇÃO FACIAL…
          </h2>
          <p className="subtitle">
            COM CERTEZA CONHECE ALGUM DESSES NOMES
          </p>
        </div>

        <div className="grid">
          {clients.map((client, index) => (
            <div key={index} className="card-wrapper">
              <InstagramCard
                username={client.username}
                profileImage={client.profileImage}
                posts={client.posts}
                followers={client.followers}
                following={client.following}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;

