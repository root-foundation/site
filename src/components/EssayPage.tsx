import React from "react";
import styles from "./EssayPage.module.css";
import SideBar from "./SideBar";
import MermaidRenderer from "./MermaidRenderer";

interface EssayPageProps {
  title: string;
  content: string;
}

export default function EssayPage({ title, content }: EssayPageProps) {
  return (
    <div className={styles.container}>
      <SideBar content={content} />
      <div className={styles.contentContainer}>
        <main className={styles.main}>
          <div className={styles.content}>
            <MermaidRenderer content={content} />
          </div>
        </main>
      </div>
    </div>
  );
}
