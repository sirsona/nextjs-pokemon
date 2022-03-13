/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/Details.module.css";
import Head from "next/head";
import Link from "next/link";

// Moving to SSR (server side rendering)

/* export const getServerSideProps = async ({ params }) => {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  return {
    props: { pokemon: await resp.json() },
  };
  }; */

// Moving to SSG (static site generation)

export const getStaticPaths = async () => {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
  );
  const pokemon = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  return {
    props: { pokemon: await resp.json() },
  };
};

export default function Detail({ pokemon }) {
  // const {
  //   query: { id },
  // } = useRouter();

  // const [pokemon, setPokemon] = useState(null);

  // useEffect(() => {
  //   async function getPokemon() {

  //     setPokemon(await resp.json());
  //   }
  //   if (id) {
  //     getPokemon();
  //   }
  // }, [id]);

  // if (!pokemon) {
  //   return null;
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      {/* Back Home Link */}
      <div>
        <button>
          <Link href="/">
            <a className={styles.tag}> Back To Home</a>
          </Link>
        </button>
      </div>

      {/* Grid layout */}
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>

        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}> {pokemon.type.join(",")} </div>

          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
