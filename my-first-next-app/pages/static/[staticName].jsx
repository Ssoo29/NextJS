import React from "react";
import fetch from "isomorphic-unfetch";

const staticName = ({ user, time }) => {
  const username = user && user.name;
  return (
    <div>
      {username}
      {time}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`https://api.github.com/users/${params.staticName}`);
    if (res.status === 200) {
      const user = await res.json();
      console.log("2: ", user);
      return { props: { user, time: new Date().toISOString() } };
    }
    return { props: { time: new Date().toISOString() } };
  } catch (e) {
    console.error(e);
    return { props: {} };
  }
};

export async function getStaticPaths() {
  return { 
    paths: [{ params: { staticName: "jerrynim" } }], 
    fallback: true 
  };
}

export default staticName;
