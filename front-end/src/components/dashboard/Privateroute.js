import { Navigate, Outlet } from "react-router-dom"
import React from "react"
import { isLoggedIn } from "../../api/auth/Authorize"

const Privateroute = ()=>{
    return isLoggedIn()?<Outlet/> :<Navigate to={'/'} />
}

export default Privateroute