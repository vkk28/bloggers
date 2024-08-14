import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-secondary-color',
    textColor = 'text-white',
    className = '',
    hover = 'hover:bg-hover-color',
    ...props
}) {
  return (
   <button className={`px-4 p-3 rounded-lg ${bgColor} ${textColor} ${textColor} ${hover} ${className} `}{...props}> 
      {children}
   </button>
  )
}

export default Button