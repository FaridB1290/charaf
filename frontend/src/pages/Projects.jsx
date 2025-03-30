import React, { useRef, useEffect } from 'react';
import Footer from '../components/Footer';

const Projects = () => {
  const containerRef = useRef(null);

  // Définition des projets statiques
  const staticProjects = [
    {
      title: 'Vimeo Video (904392431)',
      url: 'https://vimeo.com/904392431',
      thumbnail: '11.png', 
      description: 'Watch our Vimeo video!'
    },
    {
      title: 'Vimeo Video (825059903)',
      url: 'https://vimeo.com/825059903',
      thumbnail: '2.png',
      description: 'Watch our Vimeo video (825059903)!'
    },
    {
      title: 'Vimeo Video (874562532)',
      url: 'https://vimeo.com/874562532',
      thumbnail: '3.png',
      description: 'Watch our Vimeo video (874562532)!'
    },
    {
      title: 'YouTube Video (4pUS9i4mOkE)',
      url: 'https://youtu.be/4pUS9i4mOkE?si=K2z-WTvPIn2rphZ3',
      thumbnail: '4.png',
      description: 'Watch our YouTube video!'
    },
    {
      title: 'YouTube Video (T1aWYbonwhI)',
      url: 'https://youtu.be/T1aWYbonwhI?si=-8xUwYx1ZhlzUjBA',
      thumbnail: '5.png',
      description: 'Watch our YouTube video!'
    },
    {
      title: 'Action Multidisciplinaire – Beni Mellal',
      url: 'https://sahamfoundation.com/wp-content/uploads/2023/11/Action-multidisciplinaire-Beni-Mellal-01.mp4',
      thumbnail: '6.png',
      description: 'Watch our Action Multidisciplinaire video!'
    },
    {
      title: '32ème Journée de Solidarité – Beni Mellal',
      url: 'https://sahamfoundation.com/wp-content/uploads/2023/11/32e%CC%80me-journe%CC%81e-de-solidarite%CC%81-Beni-Mellal-01.mp4',
      thumbnail: '7.png',
      description: 'Watch our 32ème Journée de Solidarité video!'
    },
    {
      title: 'Interview Dr Zakia Soubhi',
      url: 'https://sahamfoundation.com/wp-content/uploads/2023/11/Interview-Dr-Zakia-Soubhi-01.mp4',
      thumbnail: '8.png',
      description: 'Watch our Interview with Dr Zakia Soubhi!'
    },
    {
      title: 'Interview Dr Marwa Tarine',
      url: 'https://sahamfoundation.com/wp-content/uploads/2023/11/Interview-DR-Marwa-Tarine-01.mp4',
      thumbnail: '9.png',
      description: 'Watch our Interview with Dr Marwa Tarine!'
    },
    {
      title: 'Charaf Lahib Red Poppy',
      url: 'https://www.tribephotomagazine.com/library/charaf-lahib-red-poppy?rq=charaf%20lahib',
      thumbnail: '10.png',
      description: 'View our Charaf Lahib Red Poppy project!'
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'scale(1)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectCards = containerRef.current.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));

    return () => {
      projectCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <style>{`
        .project-card {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background-color: #fff;
          transition: transform 0.3s, opacity 0.3s;
          transform: scale(0.95);
          opacity: 0;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .project-image-wrapper {
          width: 100%;
          height: 250px;
          overflow: hidden;
        }
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
        .project-card:hover .overlay {
          opacity: 1;
        }
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto px-4 py-8 w-full" ref={containerRef}>
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-left">Projects</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staticProjects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onClick={() => window.open(project.url, '_blank')}
            >
              <div className="project-image-wrapper">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="project-image"
                />
                <div className="overlay">
                  <p className="text-base font-medium">
                    {project.description}
                  </p>
                </div>
              </div>
              <h3 className="py-4 px-3 text-lg font-semibold text-center">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects; 