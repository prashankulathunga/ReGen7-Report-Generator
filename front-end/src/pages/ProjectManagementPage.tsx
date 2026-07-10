import { ProjectAddForm } from '@/components/ProjectAddFormPage';
import { Card } from '@/components/ui/card';

export const ProjectManagementPage = () => {

    return (
        <div className="content-p">
            <div className="grid grid-cols-12 gap-4">
                <Card className="col-span-12 lg:col-span-4">
                    <ProjectAddForm />
                </Card>
                <Card className="col-span-12 lg:col-span-8">
                </Card>
            </div>
        </div>
    );
};
