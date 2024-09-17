import React from 'react';

const PDFEmbed = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <iframe 
        src="/static/resume.pdf" 
        className="w-1/2 h-[80%] border-none shadow-lg"
      >
        This browser does not support PDFs. Please download the PDF to view it.
      </iframe>
    </div>
  );
};

export default PDFEmbed;
