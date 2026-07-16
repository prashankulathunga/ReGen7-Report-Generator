import { Badge } from '@/components/ui/badge';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const products = [
    {
        id: 101,
        projectName: 'Employee Management System',
        description: 'Manage employee records, roles, attendance, and performance.',
        status: 'In Progress',
        createdDate: '2026-06-15',
        memberCount: 6,
    },
    {
        id: 102,
        projectName: 'Smart Inventory Tracker',
        description: 'Monitor product stock, suppliers, and inventory transactions.',
        status: 'Completed',
        createdDate: '2026-05-28',
        memberCount: 4,
    },
    {
        id: 103,
        projectName: 'E-Commerce Mobile App',
        description: 'A mobile shopping application with ordering and payments.',
        status: 'Pending',
        createdDate: '2026-07-02',
        memberCount: 8,
    },
    {
        id: 104,
        projectName: 'University Event Portal',
        description: 'Manage university events, registrations, and announcements.',
        status: 'In Progress',
        createdDate: '2026-06-21',
        memberCount: 5,
    },
    {
        id: 105,
        projectName: 'AI Customer Support Bot',
        description: 'Provide automated answers to common customer questions.',
        status: 'Planning',
        createdDate: '2026-07-10',
        memberCount: 3,
    },
    {
        id: 106,
        projectName: 'Online Learning Platform',
        description: 'Deliver online courses, assessments, and student progress tracking.',
        status: 'Completed',
        createdDate: '2026-04-12',
        memberCount: 10,
    },
];

export const ProjectTable = () => {
    return (
        <div className="grid w-full [&>div]:max-h-96 [&>div]:rounded-2xl [&>div]:border-none">
            <CardHeader className="pb-12">
                <CardTitle className="font-medium">Project summery</CardTitle>
                <CardDescription className="text-muted-foreground/60 max-w-2xl text-xs md:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At maxime facilis
                    voluptatum.
                </CardDescription>
            </CardHeader>

            <div className='px-4'>
                <Table className="text-xs md:text-sm">
                    <TableHeader>
                        <TableRow className="sticky top-0 *:whitespace-nowrap after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border-none after:content-[''] backdrop-blur-3xl font-semibold">
                            <TableHead className="pl-4">ID</TableHead>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created Date</TableHead>
                            <TableHead>Member Count</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="overflow-hidden">
                        {products.map((product) => (
                            <TableRow
                                className="*:whitespace-nowrap odd:bg-accent/20"
                                key={product.id}
                            >
                                <TableCell className="pl-4 text-muted-foreground">
                                    {product.id}
                                </TableCell>
                                <TableCell>{product.projectName}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {product.description}
                                </TableCell>
                                <TableCell>
                                    <Badge className="p-2 lowercase rounded font-normal">
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-primary">
                                    {product.createdDate}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {product.memberCount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
