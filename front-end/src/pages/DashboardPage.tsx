import { DashboardCards } from '@/components/DashboardCards';
import { useAppContext } from '@/context/AppContextProvider';
import type { DashboardCardData } from '@/types';

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
                    Hey, welcome back <span className="font-bold font-mono">{user.firstName},</span>
                </h3>
                <p className="lg:text-sm text-xs text-muted-foreground/60 text-balance">
                    {dateDash}
                </p>
            </div>
            <div className="mt-6 md:mt-8">
                <div className="grid grid-cols-12 gap-4">
                    {user.role === 'Manager' && cardData.map((data, index) => (
                        <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3">
                            <DashboardCards card={data} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
