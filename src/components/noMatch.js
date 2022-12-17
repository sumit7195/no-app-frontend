import React from 'react'

import {useLocation} from "react-router-dom"


export default function NoMatch() {

    let location =  useLocation();


  return (
    <div>Route does not exist! from {location.pathname}</div>
  )
}



