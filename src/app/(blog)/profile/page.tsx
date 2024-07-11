import { options } from "@/app/api/auth/[...nextauth]/options"
import ProfileImageUploader from "@/components/ProfileImageUploader"
import { ISession } from "@/interfaces/ISession"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import db from "../../../../prisma/db"

const Profile = async () => {
    const session : ISession | null = await getServerSession(options) 
    if(!session || !session.user) redirect('/api/auth/signin?callbackUrl=/profile') // se eu n estiver logado irei para a página de login, e se eu logar vou retornar para profile: ?callbackUrl=/profile
    const user = await db.user.findUnique({
        where: {
            email: session?.user.email
        },
        include: {
            Post: true
        }
    })
    return (
        <section>
            <ProfileImageUploader user={user}/>
        </section>
    )
}

export default Profile