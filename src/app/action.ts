"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

// Modification du schéma professionalLeadSchema pour rendre les paramètres UTM optionnels
const professionalLeadSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  sector: z.enum(["TECH", "AGRO", "COMMERCE", "FINANCE", "SANTE", "EDUCATION", "AUTRE"]),
  professionalInterests: z
    .array(z.enum(["MENTORAT", "RESEAUTAGE", "EMPLOI", "FORMATION", "AUTRE"]))
    .min(1, "Sélectionnez au moins un intérêt"),
  professionalChallenges: z.string().optional(),
  subscribedToNewsletter: z.boolean().default(false),
  registeredForTrial: z.boolean().default(true),
  referralSource: z.string().optional(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
})

// Modification du schéma businessLeadSchema pour rendre les paramètres UTM optionnels
const businessLeadSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  sector: z.enum(["TECH", "AGRO", "COMMERCE", "FINANCE", "SANTE", "EDUCATION", "AUTRE"]),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  companySize: z.enum(["LESS_THAN_10", "BETWEEN_10_50", "BETWEEN_50_250", "MORE_THAN_250"]),
  companyNeeds: z
    .array(
      z.enum(["PRESENTATION_MARQUE", "RESEAU_B2B", "RECRUTEMENT", "MARCHES", "FOURNISSEURS", "FINANCEMENT", "AUTRE"]),
    )
    .min(1, "Sélectionnez au moins un besoin"),
  companyChallenges: z.string().optional(),
  subscribedToNewsletter: z.boolean().default(false),
  registeredForTrial: z.boolean().default(true),
  referralSource: z.string().optional(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
})

export async function registerProfessional(formData: FormData) {
  try {
    // Extract and validate form data
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      sector: formData.get("sector") as any,
      professionalInterests: formData.getAll("professionalInterests") as any[],
      professionalChallenges: formData.get("professionalChallenges") as string,
      subscribedToNewsletter: formData.get("subscribedToNewsletter") === "on",
      registeredForTrial: true,
      referralSource: formData.get("referralSource") as string,
      // Capture UTM parameters if available
      utmSource: formData.get("utmSource") as string,
      utmMedium: formData.get("utmMedium") as string,
      utmCampaign: formData.get("utmCampaign") as string,
    }

    // Validate the data
    const validatedData = professionalLeadSchema.parse(data)

    // Save to database
    await prisma.lead.create({
      data: {
        ...validatedData,
        role: "PROFESSIONAL",
        registrationDate: new Date(),
        ipAddress: "127.0.0.1", // In a real app, you would capture the actual IP
      },
    })

  } catch (error) {
    console.error("Error registering professional:", error)
    return { error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer." }
  }
}

export async function registerBusiness(formData: FormData) {
  try {
    // Extract and validate form data
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      sector: formData.get("sector") as any,
      companyName: formData.get("companyName") as string,
      companySize: formData.get("companySize") as any,
      companyNeeds: formData.getAll("companyNeeds") as any[],
      companyChallenges: formData.get("companyChallenges") as string,
      subscribedToNewsletter: formData.get("subscribedToNewsletter") === "on",
      registeredForTrial: true,
      referralSource: formData.get("referralSource") as string,
      // Capture UTM parameters if available
      utmSource: formData.get("utmSource") as string,
      utmMedium: formData.get("utmMedium") as string,
      utmCampaign: formData.get("utmCampaign") as string,
    }

    // Validate the data
    const validatedData = businessLeadSchema.parse(data)

    // Save to database
    await prisma.lead.create({
      data: {
        ...validatedData,
        role: "BUSINESS",
        registrationDate: new Date(),
        ipAddress: "127.0.0.1", // In a real app, you would capture the actual IP
      },
    })

  } catch (error) {
    console.error("Error registering business:", error)
    return { error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer." }
  }
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !z.string().email().safeParse(email).success) {
    return { error: "Email invalide" }
  }

  try {
    // Check if lead already exists
    const existingLead = await prisma.lead.findUnique({
      where: { email },
    })

    if (existingLead) {
      // Update existing lead
      await prisma.lead.update({
        where: { email },
        data: { subscribedToNewsletter: true },
      })
    } else {
      // Create new lead with minimal info
      await prisma.lead.create({
        data: {
          email,
          firstName: "",
          lastName: "",
          role: "PROFESSIONAL", // Default role
          sector: "AUTRE", // Default sector
          subscribedToNewsletter: true,
        },
      })
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return { error: "Une erreur est survenue. Veuillez réessayer." }
  }
}
