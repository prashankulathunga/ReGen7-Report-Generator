import { Badge } from '@/components/ui/badge';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// project
// start date
// member count

export const ProjectCard = () => {
    return (
        <CardHeader>
            <CardTitle>Recent Reports Activities</CardTitle>
            <CardDescription className="-mt-1 text-xs text-muted-foreground/60">
                Report currently in progress
            </CardDescription>

            <CardContent className="px-0">
                <div className="flex  items-center justify-between md:mt-6 mt-4">
                    <div>
                        <p className="font-semibold">Prashan</p>
                        <p className="text-muted-foreground/60 text-xs">Billing API</p>
                    </div>

                    <Badge variant="ghost" className="text-success p-2">
                        Completed
                    </Badge>
                </div>
                <div className="flex  items-center justify-between md:mt-6 mt-4">
                    <div>
                        <p className="font-semibold">Sarah</p>
                        <p className="text-muted-foreground/60 text-xs">Billing API</p>
                    </div>

                    <Badge variant="ghost" className="text-destructive p-2">
                        Late
                    </Badge>
                </div>
            </CardContent>
        </CardHeader>
    );
};
