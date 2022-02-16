import React from "react";
import fetch from "isomorphic-unfetch";
import styles from "./user.module.css";

const name = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_image_wrapper}>
        <img
          className={styles.profile_image}
          src={user.avatar_url}
          alt={`${user.name} 프로필 이미지`}
        />
      </div>
      <h2 className={styles.profile_username}>{user.name}</h2>
      <p className={styles.profile_user_login}>{user.login}</p>
      <p className={styles.profile_user_bio}>{user.bio}</p>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { name } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      const user = await res.json();
      return { props: { user } };
    }
    return { props: {} };
  } catch (e) {
    console.error(e);
    return { props: {} };
  }
};

export default name;
