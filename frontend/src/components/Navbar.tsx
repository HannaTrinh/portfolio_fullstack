import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navItems = [
        {label: 'About', path: '/about'},
        {label: 'Projects', path: '/projects'},
        {label: 'Contact Me', path: '/contact'}
    ];


  return (
    <header className='header font-spline-sans-mono'>
        <NavLink to ="/" className="rounded-lg bg-white items-center justify-center flex text-3xl font-semibold">
            <h1>Hanna Trinh</h1>
        </NavLink>
        <nav className="flex gap-8 text-lg font-medium">
            
      {navItems.map(({ label, path }) => (
        
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `relative inline-block group
             ${isActive ? 'text-pink-500' : 'text-black'}
             `
          }
        >
        <span
            className={`
              absolute left-0 bottom-0 h-[2px] w-full p-0.5 bg-pink-300 transition-all duration-300  
              group-hover:h-full group-hover:bg-pink-300
            `}
        />
          <span className="relative m-1 font-bold">{label}</span>
        </NavLink>
      ))}
    </nav>
    </header>
  )
}

export default Navbar