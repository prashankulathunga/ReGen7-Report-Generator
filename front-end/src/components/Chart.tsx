import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

export const Chart = () => {
    const chartData = [
        { month: 'January', desktop: 186 },
        { month: 'February', desktop: 305 },
        { month: 'March', desktop: 237 },
        { month: 'April', desktop: 73 },
        { month: 'May', desktop: 209 },
        { month: 'June', desktop: 24 },
        { month: 'June', desktop: 314 },
        { month: 'June', desktop: 214 },
        { month: 'June', desktop: 514 },
        { month: 'June', desktop: 214 },
        { month: 'June', desktop: 614 },
        { month: 'June', desktop: 214 },
        { month: 'June', desktop: 114 },
        { month: 'June', desktop: 14 },
        { month: 'June', desktop: 314 },
        { month: 'June', desktop: 14 },
    ];

    const chartConfig = {
        desktop: {
            label: 'Desktop',
            color: 'var(--primary)',
        },
    } satisfies ChartConfig;

    return (
        <div>
            <CardHeader>
                <CardTitle className='text-balance'>Weekly Completed Submission Summary</CardTitle>
                <CardDescription className="text-xs -mt-1">January - June 2024</CardDescription>
                <div className="flex gap-2 leading-none font-medium md:mt-4 mt-2 text-muted-foreground/60 text-xs md:text-sm">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground text-xs md:text-sm">
                    Showing total visitors for the last 6 months
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={true} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground max-sm:hidden font-mono"
                                fontSize={10}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </div>
    );
};
