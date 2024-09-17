import React from 'react';

const PDFEmbed = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl">
        <iframe 
          src="/static/resume.pdf" 
          className="w-full h-[80vh] border-none shadow-lg"
        >
          This browser does not support PDFs. Please download the PDF to view it.
        </iframe>
      </div>
    </div>
  );
};

export default PDFEmbed;
