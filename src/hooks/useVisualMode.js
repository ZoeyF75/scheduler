import { useState } from "react";

export default function useVisualMode(initial) {
  const [ history, setHistory ] = useState([initial]); //array with initial value
  // const [ "EMPTY" ] = useState(initial);

  // function that will allow us to advance to any other mode
  const transition = (newMode, replace = false) => { // transition("EDIT", true) //second param a bolean 
 
    if (replace) {
      setHistory(prev => 
        [...prev.slice(0, prev.length-1), newMode] // replace the last element in history with newMode 
        //[EMPTY, EDIT]
        //[EMPTY, CREATE] 
        // "newMode", "replace"

      )
    } else {  // calling transition for non replace  transition("EDIT, false") //if Edit is false we're gonna add to it
      setHistory(prev => 
        [...prev, newMode] // add newMode to history 
        //[EMPTY, CREATE, EDIT]
      );
    }
  }

  // function will allow us to return to the previous mode
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => 
        [...prev.slice(0, prev.length-1)]
        //[EMPTY, CREATE]
        //--> [EMPTY]

      );
    };
  };

  const mode = history[history.length-1];
  return { mode: mode, transition, back };
};
