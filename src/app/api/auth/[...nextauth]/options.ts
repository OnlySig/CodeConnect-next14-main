import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../../prisma/db";
import { ISession } from "@/interfaces/ISession";

export const options: any = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
        maxAge: 3000
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        }),
        CredentialsProvider({
            credentials: {
                email: {
                    label: "E-mail",
                    type: "email",
                    placeholder: "Digite seu email"
                }, 
                password: {
                    label: "Senha",
                    type: "password",
                    placeholder: "Digite sua senha"
                }
            },
            async authorize(credentials) {
                try {
                    const foundUser = await db.user.findFirst({
                        where: {
                            email: credentials?.email,
                        }
                    })
                    if(foundUser) {
                        console.log('user encontrado')
                        const passMatch = bcrypt.compareSync(
                            credentials!.password, 
                            foundUser.password??''
                        )
                        if(passMatch) {
                            console.log('user correto!')
                            delete foundUser.password
                            return {
                                ...foundUser,
                                id: foundUser.id.toString()
                            }
                        }
                    }
                } catch (error) {
                    console.log('deu ruim error: ',error)
                }
                return null
            }
        })
    ],
    callbacks: {
        async session({ session, token } : { session: ISession, token: any }) {
            if(session?.user) {
                session.user.id = parseInt(token.sub)
            }
            return session
        }
    }
}