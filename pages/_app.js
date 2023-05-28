import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/custom.css";
import "../styles/heroes.css";
import "sf-font";
import Link from "next/link";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <header className="d-flex flex-wrap align-items-start justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link href="/">
          <a className="d-flex align-items-center col-md-2 mb-2 mb-md-0 text-dark text-decoration-none">
            <Image
              src="home-with-zoom-tool.png"
              className="img-fluid col-md-3"
              alt="Home"
            ></Image>
          </a>
        </Link>
        <ul className="nav col-10 col-md-auto mb-2 justify-content-center mb-md-1">
          <li>
            <Link href="/">
              <a
                className="nav-link px-4 link-dark"
                style={{
                  fontFamily: "SF Pro Display",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Listed
              </a>
            </Link>
          </li>
          <li>
            <Link href="list">
              <a
                className="nav-link px-4 link-dark"
                style={{
                  fontFamily: "SF Pro Display",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                List My Property!
              </a>
            </Link>
          </li>
        </ul>
      </header>
      <Component {...pageProps} />
    </div>
  );
}
