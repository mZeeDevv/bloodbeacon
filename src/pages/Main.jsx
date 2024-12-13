import React, { useEffect } from 'react'

export default function Main() {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
     <div className='min-h-screen bg-red-50'></div>
    </>
  )
}
