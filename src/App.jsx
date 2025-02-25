import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";


let count = 0;
export default function FunnySurprise() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const button = buttonRef.current;
      if (!button) return;

      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;

      setPosition(prev => ({
        x: Math.min(prev.x, Math.max(0, window.innerWidth - buttonWidth)),
        y: Math.min(prev.y, Math.max(0, window.innerHeight - buttonHeight))
      }));
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mytimeout = ()=>{setTimeout(moveButton, 220)};

  useEffect(() => {
    mytimeout();
  }, []);

  const click = () => {
    alert("fine. You Won  ................");
  }

  const moveButton = () => {

    if (count > 5){
      alert(" You are not fast enough ................");
      count = 0;
    }
    const button = buttonRef.current;
    if (!button) return;

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const maxX = Math.max(0, window.innerWidth - buttonWidth);
    const maxY = Math.max(0, window.innerHeight - buttonHeight);

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    count++;

    setPosition({ x: newX, y: newY });
  };

  return (
    <div className="">
      <motion.button 
        ref={buttonRef}
        onClick={click} 
        onMouseEnter={mytimeout} 
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-red-500 text-white p-4 text-lg shadow-lg absolute"
      >
        Suprise me!
      </motion.button>
    </div>
  );
}