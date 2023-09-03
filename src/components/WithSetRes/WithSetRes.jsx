import React, {useState, useEffect} from 'react';

// eslint-disable-next-line react/prop-types
const WithSetRes = ({element: Component, ...props}) => {
  const higherRes = 768;
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= higherRes) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= higherRes);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (<Component isMobile={isMobile} {...props}/>);
};

export default WithSetRes;