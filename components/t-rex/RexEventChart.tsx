import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useHistory } from "@docusaurus/router";

import { useRexData } from "./helpers";

// const dormsCapacity = {
//     "Baker House": 325,
//     "Burton Conner": 388,
//     "East Campus": 383,
//     "MacGregor House": 313,
//     "Maseeh Hall": 500,
//     "McCormick Hall": 255,
//     "New House": 290,
//     "West Garage": 450,
//     "Next House": 368,
//     "Simmons Hall": 369,
//     "Random Hall": 93,
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

    const labels = Array.from(eventsByDorm?.keys() ?? []);

    return (
        <div>
            <Bar
                data={{
                    labels,
                    datasets: [
                        {
                            label: "Events",
                            data: Array.from(eventsByDorm?.values() ?? []),
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
