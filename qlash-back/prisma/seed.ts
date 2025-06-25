import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const questionTypes = [
        { name: 'Question à choix multiple', description: 'Une question avec plusieurs options de réponse, où l\'utilisateur peut en sélectionner une ou plusieurs.' },
        { name: 'Vrai/Faux', description: 'Une question avec deux réponses possibles : vrai ou faux.' },
        { name: 'Puzzle', description: 'Une question qui nécessite que l\'utilisateur mette en ordre ou arrange correctement les éléments.' }
    ];

    // Créer les questionTypes s'ils n'existent pas déjà
    for (const questionType of questionTypes) {
        const existing = await prisma.questionType.findFirst({
            where: { name: questionType.name }
        });

        if (!existing) {
            await prisma.questionType.create({
                data: questionType
            });
            console.log(`Created question type: ${questionType.name}`);
        } else {
            console.log(`Question type already exists: ${questionType.name}`);
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });