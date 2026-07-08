// week report count
// time out report count
// blockers count
// projects

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardCardData } from '@/types';

type DashboardCardProps = {
    card: DashboardCardData;
};

export const DashboardCards = ({ card }: DashboardCardProps) => {
    return (
        <Card className="@container/card">
            <CardHeader className=' flex items-start justify-between flex-col @max-md/card:h-20'>
                <CardDescription>{card.title}</CardDescription>
                <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-5xl font-mono">
                    {card.count}
                </CardTitle>
            </CardHeader>
        </Card>
    );
};
