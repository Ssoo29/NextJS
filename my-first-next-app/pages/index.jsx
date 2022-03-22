import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState } from "react";


const App = () => {
  const [username, setUsername] = useState("");
  return (
    <div className={styles.container}>
      <label>
        username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <p>{username} 깃허브 검색하기</p>
      <Link href={`/users/${username}`}>
        <a>검색하기</a>
      </Link>
      <p>static page 이동</p>
      <Link href={`/static/jerrynim`}>
        <a>static page</a>
      </Link>
    </div>
  );
};

export default App;
