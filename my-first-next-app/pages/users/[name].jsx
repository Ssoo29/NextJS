import React from "react";
import fetch from "isomorphic-unfetch";
import Profile from "../../components/Profile";

const name = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <Profile user={user}></Profile>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { name } = query;
  try {
    let user;
    let repos;

    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      user = await res.json();
    }
    const repoRes = await fetch(
      `https://api.github.com/users/${name}/repos?sort=updated&page=1&per_page=10`
    );
    if (repoRes.status === 200) {
      repos = await repoRes.json();
    }
    console.log(repos);
    return { props: { user, repos } };
  } catch (e) {
    console.error(e);
    return { props: {} };
  }
};

export default name;
