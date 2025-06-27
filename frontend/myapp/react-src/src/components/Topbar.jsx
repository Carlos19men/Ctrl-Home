import React, { useState } from 'react';

function Topbar({ onSectionChange }) {
  const [selectedSection, setSelectedSection] = useState('favoritos');

  const sections = [
    { id: 'favoritos', name: 'Favoritos', className: 'left-[51px]', dividerLeft: '180px' },
    { id: 'sala', name: 'Sala de Estar', className: 'left-[212px]', dividerLeft: '360px' },
    { id: 'cocina', name: 'Cocina', className: 'left-[414px]', dividerLeft: '535px' },
    { id: 'dormitorio', name: 'Dormitorio', className: 'left-[570px]', dividerLeft: '712px' },
    { id: 'vermas', name: 'Ver Más', className: 'left-[766px]', dividerLeft: null }
  ];

  const getSelectedPosition = () => {
    switch(selectedSection) {
      case 'favoritos': return '0';
      case 'sala': return '180px';
      case 'cocina': return '360px';
      case 'dormitorio': return '535px';
      case 'vermas': return '712px';
      default: return '0';
    }
  };

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
    onSectionChange(sectionId);
  };

  return (
    <div className="w-[896px] h-14 relative left-[9%] top-[3px]">
      <div className="w-[896px] h-14 left-0 top-0 absolute bg-zinc-100 rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-black/50" />
      
      {/* Barra azul dinámica que se mueve según la selección */}
      <div 
        className="w-48 h-14 absolute bg-blue-800 rounded-2xl transition-all duration-300 ease-in-out z-10"
        style={{
          left: getSelectedPosition()
        }}
      />
      
      {/* Separadores verticales */}
      {sections.map((section) => 
        section.dividerLeft && (
          <div
            key={`divider-${section.id}`}
            className={`w-14 h-14 absolute transition-opacity duration-300 ${
              (selectedSection === section.id || 
               (sections[sections.findIndex(s => s.id === selectedSection) - 1]?.id === section.id)) 
              ? 'opacity-0' 
              : 'opacity-100'
            }`}
            style={{
              left: section.dividerLeft,
              borderLeft: '1px solid rgba(0, 0, 0, 0.5)'
            }}
          />
        )
      )}

      {/* Secciones clickeables */}
      {sections.map((section) => (
        <div
          key={section.id}
          className={`${section.className} top-[17px] absolute justify-start text-xl font-normal font-['Lexend'] cursor-pointer transition-colors duration-300 z-20 ${
            selectedSection === section.id 
            ? 'text-zinc-100' 
            : 'text-gray-900 hover:text-blue-800'
          }`}
          onClick={() => handleSectionClick(section.id)}
        >
          {section.name}
        </div>
      ))}
    </div>
  );
}

export default Topbar;