import React from 'react';
import Link from 'next/link';

const Header = ({ currentUser }) => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/' className='navbar-brand'>
        Tickethub
      </Link>
      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>
          {currentUser ? (
            <Link href='/'>Sign Out</Link>
          ) : (
            <Link href='/auth/signup'>Sign In</Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
