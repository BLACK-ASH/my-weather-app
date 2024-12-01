import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex font-bold gap-3 text-4xl p-6 bg-[#1A56DB]' >
      <img className='' width={40} src="/logo.png" alt="" />
      <p>My Weather</p>
    </nav>
  )
}

export default Navbar