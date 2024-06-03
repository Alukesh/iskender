import {useEffect, useState} from "react";

const useCheckMobileScreen = (size = 1000) => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  // return (width <= 428);
  return (width <= size);
}

export default useCheckMobileScreen