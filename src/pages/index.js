import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { Timeline } from 'react-twitter-widgets';
import useThemeContext from "@theme/hooks/useThemeContext";

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      {description}
    </div>
  );
}

function FeatureRow() {
  const { isDarkTheme } = useThemeContext();

  const features = [
    {
      title: 'Announcements',
      description: (
        <p>
          <ul>
            <li>Welcome to the new Dormcon website! This site is currently under development.</li>
            <li><Link to="/feedback">Leave feedback for Dormcon.</Link></li>
            <li>Access meeting minutes and schedule.</li>
          </ul> 
        </p>
      ),
    },
    {
      title: 'Spring 2021 Meetings',
      description: (
        <div>
          <p>DormCon Meetings are open to <Link to="/about/voting-members">all dorm residents</Link>.</p> 
          <p>If you are not a resident in one of MIT's ten dormitories but would like to attend a DormCon meeting, please email us (<a href="mailto:ddormcon-exec@mit.edu">dormcon-exec@mit.edu</a>).</p>
          <p>The Zoom link for our meetings can be found <a href="https://mit.zoom.us/j/93298082254">here</a>.</p>
        </div>
      ),
    },
    {
      title: 'Dormcon Twitter',
      description: (
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
                <Feature key={idx} {...props} />
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
  const {siteConfig = {}} = context;

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
              About Dormcon
            </Link>
          </div>
        </div>
      </header>
      <FeatureRow />
    </Layout>
  );
}
