import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className="nav-content">
            <h2>User Form</h2>
            <div className="navlinks">
                <span><Link href="/">Home</Link></span>
                <span><Link href="/admin">Admin</Link></span>
            </div>

        </div>
    )
}

export default Navbar