import React, { useEffect, useState, useCallback } from 'react';
import { Observable } from 'rxjs';
 
export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState('stop');
  const [timer, setTimer] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [buttonName, setButtonName] = useState('Start')
 
  useEffect(() => {
    if (clickCount >= 2) {
      setStatus('wait');
    }
  }, [clickCount])
  useEffect(() => {
    clearInterval(timer)
    const unsubscribe$ = new Observable(observer => {
      setTimer(setInterval(() => {
       if (status === 'stop') {
        clearInterval(timer); 
      } else if (status === 'run') {
        clearInterval(timer);
        setSec(val => val + 1000);
        observer.next()
      }
     }, 1000));
     return () => {
      clearInterval(timer);
     }
    });
    unsubscribe$.subscribe()
  }, [status]);
 
  const start = useCallback(() => {
    if (buttonName === 'Start') {
      setButtonName('Stop');
      setStatus('run')
    } else {
      setButtonName('Start');
      setStatus('stop')
      setSec(0);
    }
  }, [buttonName]);
 
  const reset = useCallback(() => {
    setSec(0);
    setStatus('run');
  }, []);
 
  const wait = useCallback(() => {
    setClickCount(val => val + 1)
    setTimeout(() => {
      setClickCount(0)
    }, 300);
  }, []);
 
  return (
    <div>
      <span> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button className="start-button" onClick={start}>
        {buttonName}
      </button>
      <button onClick={reset}>Reset</button>
      <button onClick={wait}>Wait</button>
    </div>
  );
}
