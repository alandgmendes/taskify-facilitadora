import { Sidebar } from "../../_components/Sidebar";
import { OrgControl } from "./_components/org-control";

const OrganizationIdLayout = ({
    children,
} : { 
    children: React.ReactNode
}) => {
    return (
        <main className="pt-20 md:pt-24 px-24 max-w-6xl 2xl:max-x-screen-xl mx-auto">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
            </div>
            {children}
        </main>
    );
}

export default OrganizationIdLayout;