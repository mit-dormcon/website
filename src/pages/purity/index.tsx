import { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

const QUESTIONS = [
    "attended a dormcon meeting",
    "attended a dormcon meeting more than once",
    "attended dormcon for more than a year",
    "attended dormcon in the last 3 months",
    "went to a dormcon meeting without being a president or officer",
    "gone to a dormcon meeting without being a dorm resident",
    "come to dormcon meeting while not an MIT student",
    "gone to a dormcon meeting, took the food, and left",
    "read over dormcon minutes from a meeting you'd been to",
    "gone to dormcon for a significant other or interested party",
    "was a proxy for someone at dormcon meeting",
    "showed up to a dormcon meeting/retreat intoxicated",
    "showed up to a dormcon meeting/retreat hungover",
    "gotten intoxicated with other dormcon members",
    "attended a dormcon retreat",
    "attended multiple dormcon retreats",
    "wanked for 15 minutes continuously",
    "wanked for more than 3 hours continuously",
    "wanked about the same thing at 3 consecutive meetings",
    "ran for a dormcon office",
    "ran for an office because you didn't trust anyone else to do it",
    "ran for a dormcon office, didn't get elected, ran again",
    "got elected a dormcon officer at the first meeting attended",
    "was a dormcon officer",
    "held a dormcon office as a freshman",
    "held the same dormcon office (or dorm presidency)for multiple terms",
    "was a dorm president",
    "was a dorm president and dormcon officer at the same time",
    "been dormcon president",
    "been dormcon REX chair",
    "been in dormcon and UA at the same time",
    "held the same dormcon and UA position at the same time",
    "split your dormcon election votes among multiple candidates",
    "dissented from your president at a dormcon election meeting",
    "gossiped about things discussed in closed dormcon meetings",
    "you are on a first name basis with 1 admin?",
    "5 admins?",
    "more than 10 admins?",
    "taken out to dinner by an admin",
    "been in a yelling match with an admin",
    "had personal conversation with an admin",
    "had an argument with the MIT president",
    "had an argument with an MIT administrator",
    "the UAAP has threatened to stop your graduation",
    "been to a meeting at 10 of the 11 dorms",
    "went to dorms you've  never been to before because of dormcon",
    "ate in a dining hall for the first time because of dormcon",
    "insulted your own dorm at dormcon",
    "insulted another dorm at dormcon",
    "represented dormcon at a non-dormcon meeting",
    "quit another student government organizaion to be in dormcon",
    "been in a yelling match with the UA",
    "while in a dormcon position hooked up with or dated someone in the UA",
    "asked dormcon for money",
    "attempted to embezzle dormcon money",
    "successfully embezzled dormcon  money",
    "been a dormcon signatory",
    "emailed dorms-prez or dormcon-exec",
    "emailed dorms@mit.edu (and had your message approved)",
    "added someone to dormcon-announce",
    "you have a dormcon folder on your computer",
    "you have a dormcon folder in your athena directory",
    "visited the dormcon website",
    "edited the dormcon website",
    "facebooked dormcon members",
    "been in the dormcon facebook group",
    "recruited other people for dormcon",
    "name 1 past dormcon president",
    "name 5 past dormcon presidents",
    "read the dormcon constitution in full",
    "rewritten the dormcon constitution",
    "manned a dormcon booth at a midway",
    "own a dormcon shirt",
    "worn your dormcon shirt at a party",
    "punted by going to a dormcon meeting",
    "failed a class for dormcon related reasons",
    "pulled an all-nighter for dormcon",
    "dreamt about dormcon",
    "dreamt about dormcon more than 3 nights in a row",
    "started intoxicating yourself due to dormcon",
    "asked someone from dormcon on a date that you didn't know before dormcon",
    "been in a relationship with someone from dormcon",
    "dated multiple people from dormcon",
    "engaged in sexual activity with someone from dormcon",
    "engaged in sexual activity with multiple people from dormcon",
    "engaged in sexual activity with multiple people from dormcon at the same time",
    "engaged in sexual activity at a dormcon retreat",
    "dated someone who has held the same dormcon office as you",
    "engaged in sexual activity with someone who has held the same dormcon office as you",
    "engaged in sexual activity with a dormcon president",
    "engaged in sexual activity for dormcon political purposes",
    "written an editorial for the tech",
    "emailed dormcon-advisors for advice",
    "has talked to anyone from bexley regarding dormcon",
    "put your dormcon-related experience on your resume",
    "talked about dormcon at a job interview",
    "looked through the old dormcon archives in the UA office",
    "your dormcon purity score is lower than your senior house purity score",
    "know about the dormcon shark",
    "hung out with snaggs",
];

const ChecklistItem = ({
    setActiveItemsCount,
    label,
    id,
}: {
    setActiveItemsCount: React.Dispatch<React.SetStateAction<number>>;
    label: string;
    id: string;
}) => {
    const [isActive, setIsActive] = useState(false);

    const changeHandler = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        if (!isActive) {
            setActiveItemsCount((prevCount) => {
                if (prevCount !== 0) {
                    return prevCount - 1;
                }

                return prevCount;
            });
        }

        if (isActive) {
            setActiveItemsCount((prevCount) => prevCount + 1);
        }
    }, [isActive, setActiveItemsCount]);

    return (
        <>
            <input
                type="checkbox"
                checked={isActive}
                onChange={changeHandler}
                id={id}
            />
            <label htmlFor={id}>{label}</label>
        </>
    );
};

export default function PurityTest() {
    const [score, setScore] = useState<number | null>(null);
    const [activeItemsCount, setActiveItemsCount] = useState(0);
    const [showAlert, setShowAlert] = useState(true);

    const calculateButtonHandler = () => {
        setScore(100 - activeItemsCount);
    };

    return (
        <>
            <meta name="robots" content="noindex"></meta>
            <Layout title="DormCon Purity Test" description="">
                <main className="container container--fluid margin-vert--lg">
                    <div className="row">
                        <div className="col">
                            <div
                                className="alert alert--primary"
                                role="alert"
                                hidden={!showAlert}
                            >
                                <button
                                    aria-label="Close"
                                    className="clean-btn close"
                                    type="button"
                                    onClick={() => setShowAlert(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <strong>Note:</strong> This Purity Test is a
                                recreation of the{" "}
                                <Link href="https://web.mit.edu/dormcon/www/dormcon-purity-test.html">
                                    original DormCon Purity Test
                                </Link>
                                . Enjoy :)
                            </div>
                            <Heading as="h1">DormCon Purity Test</Heading>
                            <div>
                                <ol>
                                    {QUESTIONS.map((question, index) => (
                                        <li key={index}>
                                            <ChecklistItem
                                                setActiveItemsCount={
                                                    setActiveItemsCount
                                                }
                                                label={question}
                                                id={`question-${index}`}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <Heading as="h2">{score}</Heading>
                            <button
                                className="button button--primary"
                                onClick={calculateButtonHandler}
                            >
                                Calculate!
                            </button>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}
