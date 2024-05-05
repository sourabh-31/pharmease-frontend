import { useContext } from "react";
import { createContext } from "react";
import Logo from "../data/assets/logo.svg";
import styles from "../styles/Table.module.css";

const TableContext = createContext();

function Table({ children, column }) {
  const Table = {
    border: "1px solid #a1a1aa",
    marginRight: "5px",
    maxHeight: "55vh",
    backgroundColor: "#fff",
    overflow: "auto",
  };

  return (
    <TableContext.Provider value={{ column }}>
      <section style={Table}>{children}</section>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { column } = useContext(TableContext);

  const Header = {
    display: "grid",
    gridTemplateColumns: column,
    columnGap: "2rem",
    alignItems: "center",
    padding: "1.2rem 2rem",
    backgroundColor: "#fff",
    borderBottom: "1px solid #d4d4d8",
    letterSpacing: "0.4px",
    fontWeight: 600,
    color: "#000",
    fontSize: "1.05rem",
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  return <header style={Header}>{children}</header>;
}

function Row({ children }) {
  const { column } = useContext(TableContext);

  const Row = {
    display: "grid",
    gridTemplateColumns: column,
    columnGap: "2rem",
    alignItems: "center",
    padding: "0.8rem 2.2rem",
    backgroundColor: "#fff",
    fontSize: "0.98rem",
  };

  return (
    <div style={Row} className={styles.row}>
      {children}
    </div>
  );
}

function Body({ data, render }) {
  const Empty = {
    fontSize: "1rem",
    fontWeight: 200,
    textAlign: "center",
    margin: "2.4rem",
    letterSpacing: "0.05rem",
    wordSpacing: "0.05rem",
  };

  if (!data.length) return <p style={Empty}>NO DATA TO SHOW AT THE MOMENT</p>;

  return <main>{data.map(render)}</main>;
}

function Footer() {
  return (
    <footer className="flex justify-end items-center gap-1 p-2 mt-4 font-semibold text-sm text-[#01909a]">
      <span>COPYRIGHT © PHARMEASE.COM</span>
      <span>
        <img src={Logo} alt="logo" className="w-5" />
      </span>
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
