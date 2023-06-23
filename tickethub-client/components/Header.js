import React from 'react';
import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className='nav-item'>
          <Link
            href={href}
            className='link-dark link-underline-none text-decoration-none'
          >
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light navbar-expand'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <Link href='/' className='navbar-brand navbar-nav m-2 m-lg-0 p-3'>
            Tickethub
          </Link>
          <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
              {links.map((link, index) => (
                <li
                  key={index}
                  className='nav-item'
                  style={{ margin: '1rem' }} // Add space using inline style
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
