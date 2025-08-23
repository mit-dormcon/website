import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useHistory } from "@docusaurus/router";

import { useRexData } from "./helpers";

// const dormsCapacity = {
//     "Baker House": 325,
//     "Burton Conner": 388,
//     "East Campus": 375,
//     "MacGregor House": 313,
//     "Maseeh Hall": 501,
//     "McCormick Hall": 255,
//     "New House": 290,
//     "West Garage": 450,
//     "Next House": 368,
//     "Random Hall": 93,
//     "Simmons Hall": 368,
// };

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

export default function RexEventChart() {
    const [eventsByDorm, setEventsByDorm] = useState<Map<string, number>>();
    const { data } = useRexData();
    const history = useHistory();

    useEffect(() => {
        const byDorm = new Map<string, number>();
        for (const event of data?.events ?? []) {
            event.dorm.forEach((dorm) => {
                if (dorm !== "Campus Wide!") {
                    // skip dormcon events
                    byDorm.set(dorm, (byDorm.get(dorm) ?? 0) + 1);
                }
            });
        }
        setEventsByDorm(byDorm);
    }, [data]);

    const [values, labels] = useMemo(() => {
        const entries = Array.from(eventsByDorm?.entries() ?? []);
        entries.sort((a, b) => (a[0] > b[0] ? 1 : -1)); // Sort by dorm name
        const values = Array.from(entries, (e) => e[1]);
        const labels = Array.from(entries, (e) => e[0]);

        return [values, labels];
    }, [eventsByDorm]);

    return (
        <div>
            <Bar
                data={{
                    labels,
                    datasets: [
                        {
                            label: "Events",
                            data: values,
                            backgroundColor: labels.map((l) =>
                                data?.colors.dorms.get(l),
                            ),
                        },
                    ],
                }}
                options={{
                    plugins: { tooltip: { enabled: true } },
                    onClick: (_, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const dorm = labels[index];
                            history.push(
                                `/rex/events?dorm=${encodeURIComponent(dorm)}`,
                            );
                        }
                    },
                }}
            />
        </div>
    );
}
