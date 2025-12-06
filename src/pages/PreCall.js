import React from 'react';
import NoticeBanner from '../components/NoticeBanner/NoticeBanner';
import FooterSection from '../sections/FooterSection/FooterSection';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import Dep1 from '../imgs/Dep1.png';
import Dep2 from '../imgs/Dep2.png';
import Dep3 from '../imgs/Dep3.png';
import Dep4 from '../imgs/Dep4.png';
import Dep5 from '../imgs/Dep5.png';
import Dep6 from '../imgs/Dep6.png';
import Dep7 from '../imgs/Dep7.png';
import Dep8 from '../imgs/Dep8.png';
import Dep9 from '../imgs/Dep9.png';
import Dep10 from '../imgs/Dep10.png';
import Dep11 from '../imgs/Dep11.png';
import Dep12 from '../imgs/Dep12.png';
import ReconectaLogo from '../imgs/reconecta-comp.svg';
import './PreCall.css';

const PreCall = () => {
  // Extrair IDs dos vídeos do YouTube
  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const testimonialVideos = [
    {
      id: extractYouTubeId('https://www.youtube.com/watch?v=BdvgjHc96q0'),
      title: 'O PROBLEMA NÃO É O MERCADO... É A FORMA QUE VOCÊ SE ENXERGA',
      thumbnailUrl: `https://i.ytimg.com/vi/${extractYouTubeId('https://www.youtube.com/watch?v=BdvgjHc96q0')}/sddefault.jpg`
    },
    {
      id: extractYouTubeId('https://www.youtube.com/watch?v=eVs9C7nThx8'),
      title: 'CIDADE PEQUENA NÃO É DESCULPA!',
      thumbnailUrl: `https://i.ytimg.com/vi/${extractYouTubeId('https://www.youtube.com/watch?v=eVs9C7nThx8')}/sddefault.jpg`
    },
    {
      id: extractYouTubeId('https://www.youtube.com/watch?v=7wmhRHmi_kM'),
      title: 'NUNCA É TARDE PARA RECONECTAR',
      thumbnailUrl: `https://i.ytimg.com/vi/${extractYouTubeId('https://www.youtube.com/watch?v=7wmhRHmi_kM')}/sddefault.jpg`
    }
  ];

  const bottomVideos = [
    {
      id: extractYouTubeId('https://www.youtube.com/watch?v=AHtt-BBGZig'),
      thumbnailUrl: `https://i.ytimg.com/vi/${extractYouTubeId('https://www.youtube.com/watch?v=AHtt-BBGZig')}/sddefault.jpg`
    },
    {
      id: extractYouTubeId('https://www.youtube.com/watch?v=sI1UwbSGUUs'),
      thumbnailUrl: `https://i.ytimg.com/vi/${extractYouTubeId('https://www.youtube.com/watch?v=sI1UwbSGUUs')}/sddefault.jpg`
    },
    {
      id: extractYouTubeId('https://www.youtube.com/watch?v=i_e0kz81CM0'),
      thumbnailUrl: `https://i.ytimg.com/vi/${extractYouTubeId('https://www.youtube.com/watch?v=i_e0kz81CM0')}/sddefault.jpg`
    },
    {
      id: extractYouTubeId('https://www.youtube.com/watch?v=aYl_h5DYhdQ'),
      thumbnailUrl: `https://i.ytimg.com/vi/${extractYouTubeId('https://www.youtube.com/watch?v=aYl_h5DYhdQ')}/sddefault.jpg`
    }
  ];

  // Array com todas as imagens de depoimentos
  const depoimentosImages = [
    Dep1, Dep2, Dep3, Dep4, Dep5, Dep6,
    Dep7, Dep8, Dep9, Dep10, Dep11, Dep12
  ];

  return (
    <div className="pre-call-page">
      <NoticeBanner />
      
      <div className="pre-call-container">
        {/* Logo no topo */}
        <div className="logo-top">
          <img src={ReconectaLogo} alt="Reconecta" className="reconecta-logo" />
        </div>

        {/* Seção Principal */}
        <section className="main-section">
          <h1 className="main-title">
            IMPORTANTE: TUDO QUE VOCÊ PRECISA SABER ANTES DA SUA CONSULTA
          </h1>
          <p className="main-text">
            É obrigatório assistir esses vídeos antes da chamada. Isso deixa o processo 100% mais fluido e garante que você tire o máximo do nosso tempo juntos.
          </p>
          
          <p className="training-text">
            👋🏼 1) Assista o Treinamento (você já deveria ter visto) Se não viu ainda, assista agora.
          </p>
          
          {/* Vídeo Principal - Panda Video */}
          <div className="main-video-wrapper">
            <iframe
              id="panda-1e5df8d9-dd65-458c-aedf-0a2b164d7d3d"
              src="https://player-vz-883ca037-9f1.tv.pandavideo.com.br/embed/?v=1e5df8d9-dd65-458c-aedf-0a2b164d7d3d&preload=false"
              style={{ border: 'none' }}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
              allowFullScreen={true}
              width="100%"
              height="100%"
              fetchPriority="high"
              title="Vídeo Principal"
            />
          </div>

          {/* Seção PROVA */}
          <div className="prova-section">
            <div className="prova-conveyor">
              <div className="prova-track">
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
                <div className="prova-item">PROVA 🚨</div>
              </div>
            </div>
          </div>
        </section>

        {/* Vídeos de Depoimentos Principais */}
        <section className="testimonials-section">
          {testimonialVideos.map((video, index) => (
            <div key={video.id} className="testimonial-video-wrapper">
              <h2 className="testimonial-title">{video.title}</h2>
              <div className="testimonial-video">
                <VideoPlayer
                  videoId={video.id}
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Seção de Depoimentos em Texto (WhatsApp) */}
        <section className="text-testimonials-section">
          <h2 className="section-title">MAIS DOS MELHORES DEPOIMENTOS</h2>
          <div className="whatsapp-grid">
            {depoimentosImages.map((image, index) => (
              <div key={index} className="whatsapp-screenshot">
                <img 
                  src={image} 
                  alt={`Depoimento ${index + 1}`}
                  className="depoimento-image"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Seção de Vídeos de Depoimentos Inferiores */}
        <section className="bottom-videos-section">
          <h2 className="section-title">MAIS DOS MELHORES DEPOIMENTOS EM VÍDEO</h2>
          <div className="bottom-videos-grid">
            {bottomVideos.map((video) => (
              <div key={video.id} className="bottom-video-wrapper">
                <VideoPlayer
                  videoId={video.id}
                  thumbnailUrl={video.thumbnailUrl}
                  title="Depoimento em Vídeo"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <FooterSection />
    </div>
  );
};

export default PreCall;

