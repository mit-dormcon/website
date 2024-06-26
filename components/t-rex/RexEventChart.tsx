import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchEvents } from "../../src/pages/rex/events";
import { TRexAPIResponse } from "./types";

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
    const [api, setApi] = useState<TRexAPIResponse>();

    useEffect(() => {
        fetchEvents().then((d) => {
            d.colors.dorms.set("West Garage", d.colors.dorms.get("New Vassar"));
            setApi(d);
            const byDorm = new Map<string, number>();
            for (const event of d.events) {
                for (let dorm in event.dorm) {
                    if (
                        [
                            "La Casa",
                            "German House",
                            "French House",
                            "iHouse",
                            "Juniper",
                            "Chocolate City",
                        ].includes(dorm)
                    )
                        dorm = "New House";
                    else if (dorm === "New Vassar") dorm = "West Garage";
                    else if (dorm === "Campus Wide!") continue;

                    if (byDorm.has(dorm))
                        byDorm.set(dorm, byDorm.get(dorm) + 1);
                    else byDorm.set(dorm, 1);
                }
            }
            setEventsByDorm(byDorm);
        });
    }, []);

    const labels = Array.from(eventsByDorm?.keys() ?? []);

    return (
        <div>
            {eventsByDorm ? (
                <Bar
                    data={{
                        labels,
                        datasets: [
                            {
                                label: "Events",
                                data: Array.from(eventsByDorm.values()),
                                backgroundColor: labels.map((l) =>
                                    api.colors.dorms.get(l),
                                ),
                            },
                        ],
                    }}
                    options={{ plugins: { tooltip: { enabled: true } } }}
                />
            ) : (
                "Loading..."
            )}
        </div>
    );
}
