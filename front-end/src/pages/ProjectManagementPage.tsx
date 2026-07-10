import { ProjectAddForm } from '@/components/ProjectAddFormPage';

export const ProjectManagementPage = () => {
    return (
        <div className="content-p">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-6">
                    <ProjectAddForm />
                </div>
            </div>
        </div>
    );
};
