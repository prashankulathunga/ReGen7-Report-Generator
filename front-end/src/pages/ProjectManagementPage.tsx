import { ProjectAddForm } from '@/components/ProjectAddFormPage';
import { Card } from '@/components/ui/card';

export const ProjectManagementPage = () => {
    return (
        <div className="content-p">
            <div className="grid grid-cols-12 gap-4">
                <Card className="col-span-12 lg:col-span-6 py-12 px-4">
                    <ProjectAddForm />
                </Card>
                <Card className="col-span-12 lg:col-span-6 bg-accent/16 py-12 px-4"></Card>
            </div>
        </div>
    );
};
