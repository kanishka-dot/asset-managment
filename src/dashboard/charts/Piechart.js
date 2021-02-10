import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
    Legend
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';



export default function PieChart() {
    const chartData = [
        { country: 'Russia', area: 15 },
        { country: 'Canada', area: 10 },
        { country: 'USA', area: 20 },
        { country: 'Others', area: 55 },
    ];
    return (
        <Paper>
            <Chart
                data={chartData}
            >
                <PieSeries
                    valueField="area"
                    argumentField="country"
                />
                <Title
                    text="Area of Countries"
                />
                <Legend />
                <Animation />

            </Chart>
        </Paper>
    )
} 