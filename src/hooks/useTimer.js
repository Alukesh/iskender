import { useEffect, useState } from 'react';

const useCountdown = (initialTime = 45) => {
    const [leftSec, setLeftSec] = useState(initialTime)
    const [start, setStart] = useState(false);

    const startTimer = setInterval(() => {
        if (!start) return
        if (leftSec <= 0) setLeftSec('00');
        setLeftSec(sec => sec - 1)
    }, 1000)

    const restart = () => {
        setLeftSec(initialTime)
        clearInterval(startTimer)
    }
    useEffect(() => {

        return () => {
            clearInterval(startTimer)
        }
    })

    return {leftSec:`${leftSec}`, start:setStart, restart}
};

export { useCountdown };
