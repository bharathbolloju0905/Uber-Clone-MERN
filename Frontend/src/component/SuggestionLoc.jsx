import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

const SuggestionLoc = ({ suggestion, onClick }) => {
  return (
    <div className='suggest' onClick={onClick}>
      <div classname="imgloc">

      <FaLocationDot className='imgloc' />
      </div>
      <div className="sugg">
        <p><b>{suggestion.description}</b></p>
        <p className='para'>{suggestion.structured_formatting.secondary_text}</p>
      </div>
    </div>
  )
}

export default SuggestionLoc;