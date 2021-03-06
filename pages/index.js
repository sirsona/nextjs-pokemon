/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

// Moving to SSR (server side rendering)
// export async function getServerSideProps() {
//   const resp = await fetch(
//     "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
//   );

//   return {
//     props: { pokemon: await resp.json() },
//   };
// }

// Moving to SSG (static site generation)
export async function getStaticProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    revalidate: 30,
  };
}

export default function Home({ pokemon }) {
  // const [pokemon, setPokemon] = useState([]);

  // useEffect(() => {
  //   async function getPokemon() {

  //     setPokemon(await resp.json());
  //   }
  //   getPokemon();
  // }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Pokemon Mode </title>
      </Head>
      <h1>Pokemon List</h1>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
