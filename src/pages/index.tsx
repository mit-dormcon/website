import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
// import { Timeline } from "react-twitter-widgets";
// import { useColorMode } from "@docusaurus/theme-common";
import { meetings } from "../../data/meetings";
// import RexEventChart from "../../components/t-rex/RexEventChart";
import Heading from "@theme/Heading";

function Feature(props: {
    imageUrl?: string;
    title: string;
    children: React.ReactNode;
}) {
    const { imageUrl, title, children } = props;
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx("col col--4", styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img
                        className={styles.featureImage}
                        src={imgUrl}
                        alt={title}
                    />
                </div>
            )}
            <Heading as="h3">{title}</Heading>
            {children}
        </div>
    );
}

function FeatureRow() {
    // const { colorMode } = useColorMode();
    // const isDarkTheme = colorMode === "dark";

    const features = [
        {
            title: "Announcements",
            children: (
                <div>
                    <ul>
                        <li>
                            Our next meeting is on Thursday, March 14th, in
                            MacGregor @ 7:00 pm!
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: `${meetings.year} Meetings`,
            children: (
                <div>
                    <p>
                        <Link to="/about/meetings">DormCon meetings</Link> are
                        open to{" "}
                        <Link to="/about/voting-members">
                            all dorm residents
                        </Link>
                        .
                    </p>
                    <p>
                        If you are not a resident in one of MIT&apos;s eleven
                        dormitories but would like to attend a DormCon meeting,
                        please email us (
                        <Link href="mailto:dormcon-exec@mit.edu">
                            dormcon-exec [at] mit [dot] edu
                        </Link>
                        ).
                    </p>
                </div>
            ),
        },
        {
            title: "Resources",
            children: (
                <div>
                    <ul>
                        <li>
                            <Link to="/piazza">
                                Ask a question on the DormCon Piazza.
                            </Link>
                        </li>
                        <li>
                            <Link to="http://bit.ly/dining23">
                                Give feedback to a dining hall.
                            </Link>
                        </li>
                        <li>
                            <Link to="/about/meetings">
                                View the meeting schedule.
                            </Link>
                        </li>
                    </ul>
                </div>
            ),
        },
        // {
        //     title: "DormCon Twitter",
        //     children: (
        //         <Timeline
        //             dataSource={{
        //                 sourceType: "profile",
        //                 screenName: "MITDormCon",
        //             }}
        //             options={{
        //                 height: "400",
        //                 theme: isDarkTheme ? "dark" : "light",
        //             }}
        //         ></Timeline>
        //     ),
        // },
        // {
        //     title: "REX Events Per Dorm",
        //     children: <RexEventChart />,
        // },
    ];

    return (
        <main>
            {features && features.length > 0 && (
                <section className={styles.features}>
                    <div className="container">
                        <div className="row">
                            {features.map((props, idx) => (
                                // eslint-disable-next-line react/prop-types
                                <Feature key={idx} title={props.title}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    {props.children}
                                </Feature>
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
    const { siteConfig } = context;

    const header = {
        title: siteConfig.title,
        subtitle: siteConfig.tagline,
        button: "About DormCon",
        buttonLink: "/about",
    };

    return (
        <Layout
            title={`Hello from ${siteConfig.title}!`}
            description={siteConfig.tagline}
        >
            <header className={clsx("hero hero--primary", styles.heroBanner)}>
                <div className="container">
                    {/* <span className="badge badge--secondary">
                        Happening Now
                    </span> */}
                    <Heading as="h1" className="hero__title">
                        {header.title}
                    </Heading>
                    <p className="hero__subtitle">{header.subtitle}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                "button button--secondary button--lg",
                                styles.getStarted,
                            )}
                            to={header.buttonLink}
                        >
                            {header.button}
                        </Link>
                    </div>
                </div>
            </header>
            <FeatureRow />
        </Layout>
    );
}
