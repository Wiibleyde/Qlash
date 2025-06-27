import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserService {
    static async createUser(email: string, password: string, name: string) {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hasher le mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        // Retourner l'utilisateur sans le mot de passe
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static async authenticateUser(email: string, password: string) {
        // Trouver l'utilisateur
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Vérifier le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Retourner l'utilisateur sans le mot de passe
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new Error('User not found');
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static  async updateUser(id: string, data: Partial<{ email: string; name: string; password: string }>) {
        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Si le mot de passe est fourni, le hasher
        let hashedPassword;
        if (data.password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(data.password, saltRounds);
        }

        // Mettre à jour l'utilisateur
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                email: data.email || user.email,
                name: data.name || user.name,
                password: hashedPassword || user.password
            }
        });

        const { password: _, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
}