import React from 'react'


const WebtopContainer = () => {
    return (
        <div className='flex justify-center w-screen h-screen bg-slate-200 '>
        
        <iframe
          src="http://localhost:3000"
          title="Webtop Container"
          style={{ width:"100%", height:'100%', border: 'none' }}
        ></iframe>
        
        </div>
        

    );
  };

export default WebtopContainer