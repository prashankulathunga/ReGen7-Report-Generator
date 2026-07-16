import { ProjectAddForm } from '@/components/ProjectAddFormPage';
import { ProjectTable } from '@/components/ProjectTable';
import { Card } from '@/components/ui/card';

export const ProjectManagementPage = () => {
    return (
        <div className="content-p">
            <div className="grid grid-cols-12 gap-4">
                <Card className="col-span-12 py-12 px-4 shadow-none">
                    <ProjectAddForm />
                </Card>
                <Card className="col-span-12 py-12 px-4">
                    <ProjectTable />
                </Card>
            </div>
        </div>
    );
};
