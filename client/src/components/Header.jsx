// src/components/Header.jsx
function Header() {
  return (
    <header className="relative bg-desaturatedDarkCyan h-36 md:h-40 mb-12">
      <img
        src="/images/bg-header-mobile.svg"
        alt="Header background"
        className="md:hidden w-full h-full object-cover"
      />
      <img
        src="/images/bg-header-desktop.svg"
        alt="Header background"
        className="hidden md:block w-full h-full object-cover"
      />
    </header>
  );
}

export default Header;
