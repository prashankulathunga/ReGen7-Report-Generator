import { Chart } from '@/components/Chart';
import { DashboardCards } from '@/components/DashboardCards';
import { ChartPie} from '@/components/ChartPie';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContextProvider';
import type { DashboardCardData } from '@/types';
import { ReportTableM } from '@/components/ReportTableM';

export const DashboardPage = () => {
    const { user } = useAppContext();

    const todayDate = new Date();

    const dateDash = todayDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const cardData: DashboardCardData[] = [
        {
            title: 'Weekly Report Summary',
            count: 12,
            desc: 'Reports submitted during this week',
        },
        {
            title: 'Delayed Reports',
            count: 5,
            desc: 'Reports not completed on time',
        },
        {
            title: 'Current Blockers',
            count: 8,
            desc: 'Open blockers requiring attention',
        },
        {
            title: 'Active Projects',
            count: 24,
            desc: 'Projects currently in progress',
        },
    ];

    return (
        <div className="content-p w-full">
            <div>
                <h3 className="font-semibold text-balance">
                    Hey, welcome back <span className="font-bold font-mono text-muted-foreground">{user.firstName},</span>
                </h3>
                <p className="lg:text-sm text-xs text-muted-foreground/60 text-balance">
                    {dateDash}
                </p>
            </div>
            <div className="mt-6 md:mt-8">
                {/* manager section dashboard */}

                {user.role === 'Manager' && (
                    <div className="grid grid-cols-12 gap-4">
                        {cardData.map((data, index) => (
                            <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3">
                                <DashboardCards card={data} />
                            </div>
                        ))}

                        <Card className="col-span-12 lg:col-span-6 overflow-x-auto bg-primary/4">
                            <Chart/>
                        </Card>
                        <Card className="col-span-12 lg:col-span-6 bg-accent/16">
                            <ChartPie/>
                        </Card>
                        <Card className="col-span-12 min-h-56">
                            <ReportTableM/>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};
