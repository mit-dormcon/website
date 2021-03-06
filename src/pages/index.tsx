import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { Timeline } from 'react-twitter-widgets';
import { useColorMode } from '@docusaurus/theme-common';

function Feature(props: { imageUrl?: string, title: string, children: React.ReactNode }) {
  const { imageUrl, title, children } = props;
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function FeatureRow() {
  const { isDarkTheme } = useColorMode();

  const features = [
    {
      title: 'Announcements',
      children: (
        <ul>
          <li><Link to="/piazza">Ask a question on the DormCon Piazza.</Link></li>
          <li><Link to="https://bit.ly/mit-dining">Give feedback to a dining hall.</Link></li>
          <li><Link to="/about/meetings">View the meeting schedule.</Link></li>
        </ul> 
      ),
    },
    {
      title: 'Spring 2022 Meetings',
      children: (
        <div>
          <p><Link to="/about/meetings">DormCon meetings</Link> are open to <Link to="/about/voting-members">all dorm residents</Link>.</p> 
          <p>If you are not a resident in one of MIT's ten dormitories but would like to attend a DormCon meeting, please email us (<a href="mailto:ddormcon-exec@mit.edu">dormcon-exec@mit.edu</a>).</p>
        </div>
      ),
    },
    {
      title: 'DormCon Twitter',
      children: (
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'MITDormCon'
          }}
          options={{
            height: '400',
            theme: isDarkTheme ? 'dark' : 'light'
          }}
        ></Timeline>
      ),
    },
  ];

  return (
    <main>
      {features && features.length > 0 && (
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} title={props.title}>{props.children}</Feature>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig} = context;

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description={siteConfig.tagline}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
              to="/about/">
              About DormCon
            </Link>
          </div>
        </div>
      </header>
      <FeatureRow />
    </Layout>
  );
}
