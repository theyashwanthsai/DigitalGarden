import { Link } from "react-router-dom";
import AsciiBackground from "./AsciiBackground";
import "./Home.css";

const now = [
  {
    name: "Turi Labs",
    href: "https://turilabs.in",
    external: true,
    meta: "indie AI research lab",
  },
  {
    name: "the book",
    href: "/my_book",
    external: false,
    meta: "writing a book on AI agents",
  },
];

const writing = [
  { name: "Agent Skills 101", href: "/skills1", date: "Mar 2026" },
  { name: "A 24/7 team of agents on a Pi", href: "/opb", date: "Mar 2026" },
  { name: "23", href: "/23", date: "Jan 2026" },
];

const socials = [
  { name: "Twitter", href: "https://twitter.com/yashwanthsai29" },
  { name: "GitHub", href: "https://github.com/theyashwanthsai" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sai-yashwanth-457aa51b9/" },
  { name: "Medium", href: "https://medium.com/@theyashwanthsai" },
];

function ExternalLink({ href, children, className }) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Home() {
  return (
    <div className="home">
      <AsciiBackground />

      <div className="home-inner">
        <h1 className="home-title">Sai Yashwanth</h1>
        <p className="home-bio">
          Engineer, builder and writer. I run{" "}
          <a href="https://turilabs.in" target="_blank" rel="noreferrer">
            Turi Labs
          </a>
          , an indie AI research lab, and I&apos;m writing a book on AI agents.
        </p>

        <section className="home-section" aria-labelledby="now-label">
          <h2 id="now-label" className="home-label">Now</h2>
          <ul className="home-list">
            {now.map((item) => (
              <li key={item.name}>
                {item.external ? (
                  <ExternalLink href={item.href}>{item.name}</ExternalLink>
                ) : item.href ? (
                  <Link to={item.href}>{item.name}</Link>
                ) : (
                  <span className="home-name">{item.name}</span>
                )}
                <span className="home-meta">{item.meta}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-section" aria-labelledby="here-label">
          <h2 id="here-label" className="home-label">Here</h2>
          <nav className="home-links" aria-label="This site">
            <Link to="/home">Home</Link>
            <Link to="/articles">Essays</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/timeline">Timeline</Link>
            <Link to="/about">About</Link>
            <Link to="/resume">CV</Link>
          </nav>
        </section>

        <section className="home-section" aria-labelledby="writing-label">
          <h2 id="writing-label" className="home-label">Writing</h2>
          <ul className="home-list">
            {writing.map((item) => (
              <li key={item.href}>
                <Link to={item.href}>{item.name}</Link>
                <span className="home-meta">{item.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-section" aria-labelledby="elsewhere-label">
          <h2 id="elsewhere-label" className="home-label">Elsewhere</h2>
          <nav className="home-socials" aria-label="Social links">
            {socials.map((item) => (
              <ExternalLink key={item.name} href={item.href}>
                {item.name}
              </ExternalLink>
            ))}
          </nav>
        </section>
      </div>
    </div>
  );
}

export default Home;
