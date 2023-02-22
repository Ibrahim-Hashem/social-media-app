const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src="https://i.imgur.com/1Q1Z1Zm.png" alt="logo" />
      </div>
      <div className="navbar__links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/profile">Profile</a>
      </div>
    </div>
  );
};
export default Navbar;
