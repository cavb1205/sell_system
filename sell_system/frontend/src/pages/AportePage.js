import React, { useState, useEffect } from 'react';

const AportePage = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Has clicleado ${count} veces.....`;
        console.log('useefect................')
    });
  return (
    <div>
        <h2>Aporte single Page</h2>
        <p>You clicked {count} times</p>
        {console.log('useefect del return')}
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
    </div>
  )
}

export default AportePage