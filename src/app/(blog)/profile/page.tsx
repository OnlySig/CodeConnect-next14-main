import { options } from "@/app/api/auth/[...nextauth]/options"
import ProfileImageUploader from "@/components/ProfileImageUploader"
import { ISession } from "@/interfaces/ISession"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const Profile = async () => {
    const session : ISession | null = await getServerSession(options) 
    if(!session) return redirect('/')
    return (
        <section>
            <h1>
                profile
            </h1>
            <ProfileImageUploader user={session.user}/>
        </section>
    )
}

export default Profile