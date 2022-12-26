import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@exemple.com",
      avatarUrl: "https://github.com/rianRD0.png",
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Exemple Pool",
      code: "BOL123",
      ownerId: user.id,

      participant: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: "2022-12-27T22:04:11.760Z",
      firstTeamCountryCode: "DE",
      secoundTeamCountryCode: "BR",
    },
  })

  await prisma.game.create({
    data: {
      date: "2022-12-29T22:04:11.760Z",
      firstTeamCountryCode: "BR",
      secoundTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secoundTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  })
}

main()
