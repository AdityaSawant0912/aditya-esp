import React from 'react'
import Link from 'next/link';

const Navbar = ({ toggleCart }) => {
  return (
      <nav className="bg-gray-800 text-white py-4 px-5">
          <div className="container mx-auto flex justify-between items-center">
              <Link href="/">
                  <span className="text-xl font-semibold">Aditya Sawant&apos;s ESP8266</span>
              </Link>
              <ul className="flex space-x-4">
                  <li>
                      <button onClick={toggleCart} className="hover:text-gray-300">Add GPIO</button>
                  </li>
              </ul>
          </div>
      </nav>
  )
}

export default Navbar