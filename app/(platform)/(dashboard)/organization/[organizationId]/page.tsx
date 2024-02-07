import { auth } from "@clerk/nextjs";

const OrganizationIdPage = () =>{
    const { userId, orgId } = auth();
    debugger;
    return(
        <div>
            organization id page
        </div>
    );
}

export default OrganizationIdPage;