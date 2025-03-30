import React from 'react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Texte à gauche */}
          <div className="prose prose-lg">
            <p className="text-gray-900 text-lg leading-relaxed mb-8">
              <span className="font-bold">Charaf</span> Lahib is a professional photographer and videographer born near Kelaa Des Sraghna and based in Casablanca, Morocco. Since starting his journey in photography in 2014, he has developed a distinctive style that reflects his deep connection to Moroccan culture and identity. Through his lens, he captures compelling stories that merge creativity, emotion, and technical excellence.
            </p>

            <p className="text-gray-900 text-lg leading-relaxed mb-8">
              Charaf's work focuses on themes like childhood, rural life, and migration, often inspired by his upbringing in the Moroccan countryside. His ongoing projects include <span className="font-bold">The Red Poppies</span> (since 2016), <span className="font-bold">When Swallows Pass</span>, and <span className="font-bold">Sitar</span>.
            </p>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Selected Projects</h2>
              <ul className="space-y-4 text-gray-800 list-none pl-0">
                <li>• The Red Poppies (2016 - Present): A personal exploration of childhood memories in rural Morocco.</li>
                <li>• Hawafir (2024): A documentary photography project capturing the spirit of Moroccan Tbourida.</li>
                <li>• Amazigh Weddings (2024): A cultural documentation of traditional wedding customs in southeastern Morocco.</li>
                <li>• When Swallows Pass (Ongoing): A project addressing themes of youth and migration in rural Morocco.</li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Publications & Exhibitions</h2>
              <ul className="space-y-4 text-gray-800">
                <li>Hawafirmane Photozine: (The Red Poppy) → Red Poppy by Charaf Lahib</li>
                <li>Featured at Unseen Amsterdam Art Book Fair & Festival</li>
                <li>Showcased at Miss Read Berlin: The Berlin Art Book Fair & Festival</li>
                <li>Presented at Paris Photo, Polycopies Festival</li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Awards & Recognitions</h2>
              <ul className="space-y-4 text-gray-800">
                <li>FALM 2024 "Prix Révélation" for The Red Poppy Project</li>
                <li>Winner, Sower f Darek competition by Yoriyas & Zidan (2020)</li>
                <li>Runner-up, Smedia competition (2020)</li>
                <li>Featured in Horizons Intérieurs, organized by Langages du Sud & ONCF</li>
                <li>Collaborative project with Yoriyas featured in the Financial Times</li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Workshops</h2>
              <ul className="space-y-4 text-gray-800">
                <li>Conducted workshops on photography and video editing, empowering young talents to learn and grow.</li>
                <li>Trained numerous individuals in visual storytelling, contributing to the creative community in Morocco.</li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Collaborations</h2>
              <ul className="space-y-4 text-gray-800">
                <li>Worked with international organizations, including MiracleFeet and La Fédération internationale des ouvriers du transport.</li>
                <li>Collaborated on artistic projects and events with Moroccan and international partners.</li>
              </ul>
            </div>
          </div>

          {/* Image à droite */}
          <div className="relative">
            <img
              src="/charaf.jpg"
              alt="Charaf Lahib"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About; 