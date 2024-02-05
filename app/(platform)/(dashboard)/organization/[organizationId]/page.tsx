import { auth } from "@clerk/nextjs";

const OrganizationIdPage = () =>{
    const { userId, orgId } = auth();
    return(
        <div>
            organization id page, orgid = {orgId} and userId = {userId}
        </div>
    );
}

export default OrganizationIdPage;