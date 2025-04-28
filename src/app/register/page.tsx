"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRound, Building2 } from 'lucide-react'
import ProfessionalForm from "@/components/professional-form"
import BusinessForm from "@/components/business-form"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  // Get UTM parameters if available
  const utmSource = ""
  const utmMedium =  ""
  const utmCampaign = ""

  return (
    <div className="w-full h-full  ">
      <Link href="/" className="absolute top-4 left-4 text-sm font-medium hover:underline underline-offset-4">
        ← Retour à l'accueil
      </Link>

      <div className="w-full h-full flex flex-col">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Réservez votre essai gratuit</h1>
          <p className="text-sm text-muted-foreground">
            Remplissez le formulaire ci-dessous pour réserver votre place pour un essai gratuit d'un mois
          </p>
        </div>

        {!activeTab ? (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">Choisissez votre type de compte :</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab("professional")}
                className="flex flex-col items-center justify-center p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <UserRound className="h-12 w-12 mb-2 text-blue-500" />
                <span className="font-medium">Professionnel</span>
                <span className="text-xs text-muted-foreground mt-1 text-center">
                  Pour les particuliers et indépendants
                </span>
              </button>
              <button
                onClick={() => setActiveTab("business")}
                className="flex flex-col items-center justify-center p-6 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Building2 className="h-12 w-12 mb-2 text-blue-500" />
                <span className="font-medium">Entreprise</span>
                <span className="text-xs text-muted-foreground mt-1 text-center">
                  Pour les sociétés et organisations
                </span>
              </button>
            </div>
          </div>
        ) : (
            <Card className="w-full h-full bg-white shadow-none rounded-none p-0">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div>
                <CardTitle>
                  {activeTab === "professional" ? "Inscription Professionnel" : "Inscription Entreprise"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "professional"
                    ? "Créez votre compte professionnel pour accéder à des opportunités de mentorat, de réseautage et d'emploi."
                    : "Créez votre compte entreprise pour présenter votre marque, développer votre réseau B2B et trouver des talents."}
                </CardDescription>
              </div>
              <button
                onClick={() => setActiveTab(null)}
                className="text-sm text-muted-foreground hover:text-blue-500"
              >
                Changer
              </button>
            </CardHeader>
          
            <CardContent className="w-full h-full p-4">
              {activeTab === "professional" ? (
                <div className="w-full h-full">
                  <ProfessionalForm utmSource={utmSource} utmMedium={utmMedium} utmCampaign={utmCampaign} />
                </div>
              ) : (
                <div className="w-full h-full">
                  <BusinessForm utmSource={utmSource} utmMedium={utmMedium} utmCampaign={utmCampaign} />
                </div>
              )}
            </CardContent>
          </Card>
          
        )}
      </div>
    </div>
  )
}
