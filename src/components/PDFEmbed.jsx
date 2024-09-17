import React from 'react';

const PDFEmbed = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe 
        src="/static/resume.pdf" 
        width="100%" 
        height="100%" 
        style={{ border: 'none' }}
      >
        This browser does not support PDFs. Please download the PDF to view it.
      </iframe>
    </div>
  );
};

export default PDFEmbed;
