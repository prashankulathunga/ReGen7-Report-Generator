'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';

export const description = 'A pie chart with a label';

const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: 'var(--chart-1)',
    },
    safari: {
        label: 'Safari',
        color: 'var(--chart-2)',
    },

    edge: {
        label: 'Edge',
        color: 'var(--chart-3)',
    },
    other: {
        label: 'Other',
        color: 'var(--chart-4)',
    },
} satisfies ChartConfig;

export function ChartPie() {
    return (
        <div>
            <CardHeader className="items-center pb-0">
                <CardTitle>Weekly All Submissions Summary</CardTitle>
                <CardDescription className="text-xs -mt-1">January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 mt-8 md:mt-12">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-96 pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
                    </PieChart>
                </ChartContainer>

                <CardFooter>
                    <div className="space-y-1 md:mt-8 mt-4">
                        <p className="flex gap-2 leading-none font-medium md:mt-4 mt-2 text-xs md:text-sm">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </p>
                        <p className="leading-none text-xs md:text-sm text-muted-foreground/60">
                            Showing total visitors for the last 6 months
                        </p>
                    </div>
                </CardFooter>
            </CardContent>
        </div>
    );
}
