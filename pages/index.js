import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";
import matter from "gray-matter";
import RMD from "react-markdown";
import mdx from "@mdx-js/mdx";
import { useEffect } from "react";
import Page from "../components/page";

export default function Home(props) {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <Head>
        <title>MAT 117 ARTICLE</title>
        <meta name="description" content="Created to view slides" />
      </Head>
      <div
        className="text-3xl font-main font-bold"
        style={{ color: "var(--text-color)" }}
      >
        Kriptoloji ve Blockchain - Donem Odevi
      </div>
      {props?.mdDatas?.map?.((page) => {
        return (
          <Page frontmatter={page.data} key={page.data.title}>
            {page.content.trim()}
          </Page>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const dirPath = "./markdowns";
  const files = fs.readdirSync(dirPath);
  const datas = [];
  files.forEach((file) => {
    let data = fs.readFileSync(dirPath + "/" + file);
    data = String(data);
    data = matter(data);
    mdx(data.content).then((res) => {
      datas.push({ ...data, orig: String(data.orig), component: res });
    });
  });
  return {
    props: {
      mdDatas: datas,
    },
  };
};
