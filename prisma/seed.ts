import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.lead.upsert({
    where: { id: "demo_lead" },
    update: {},
    create: {
      id: "demo_lead",
      companyName: "Marmara Tekstil",
      personName: "Ayşe Yılmaz",
      email: "ayse@marmaratekstil.com",
      location: "İstanbul, Türkiye",
      productInterest: "Metal düğme",
      missingFieldsJson: JSON.stringify(["size_mm", "quantity"]),
      messages: {
        create: [
          { role: "user", content: "Merhaba, metal düğme fiyatı alabilir miyim?" },
          { role: "assistant", content: "Tabii, adet, çap(mm) ve renk paylaşabilir misiniz?" }
        ]
      }
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
