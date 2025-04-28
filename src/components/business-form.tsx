"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { registerBusiness } from "@/app/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import EmailVerification from "@/components/email-verification"

interface BusinessFormProps {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  onStepChange?: (step: number) => void
}

export default function BusinessForm({ utmSource, utmMedium, utmCampaign, onStepChange }: BusinessFormProps) {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sector: "",
    companyName: "",
    companySize: "",
    companyNeeds: [] as string[],
    companyChallenges: "",
    subscribedToNewsletter: false,
    referralSource: "",
  })

  useEffect(() => {
    if (onStepChange) {
      onStepChange(step)
    }
  }, [step, onStepChange])

  const handleNeedChange = (need: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, companyNeeds: [...prev.companyNeeds, need] }
      } else {
        return { ...prev, companyNeeds: prev.companyNeeds.filter((n) => n !== need) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataObj = new FormData()

    // Add all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formDataObj.append(key, item))
      } else {
        formDataObj.append(key, value.toString())
      }
    })

    // Add UTM parameters if available
    if (utmSource) formDataObj.append("utmSource", utmSource)
    if (utmMedium) formDataObj.append("utmMedium", utmMedium)
    if (utmCampaign) formDataObj.append("utmCampaign", utmCampaign)
    
    // Ajouter l'état de vérification de l'email
    formDataObj.append("emailVerified", isEmailVerified.toString())

    try {
      await registerBusiness(formDataObj)
      router.push("/register/success")

    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step === 1 && !isEmailVerified) {
      // S'arrêter pour vérifier l'email avant de passer à l'étape 2
      setStep(1.5)
    } else {
      setStep(step + 1)
    }
  }
  
  const prevStep = () => {
    if (step === 1.5) {
      setStep(1)
    } else {
      setStep(step - 1)
    }
  }

  const handleEmailVerified = () => {
    setIsEmailVerified(true)
    setStep(2)
  }

  // Fonction pour afficher les étapes progressives
  const renderProgressSteps = () => {
    const totalSteps = 3
    return (
      <div className="flex items-center justify-between mb-6">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNumber = idx + 1
          const isActive = step >= stepNumber
          const isCompleted = step > stepNumber

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {stepNumber > 1 && (
                <div
                  className={`flex-1 h-1 ${
                    isActive ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}
              <div
                className={`relative flex flex-col items-center ${
                  stepNumber > 1 ? "ml-2" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-xs mt-1 text-center">
                  {stepNumber === 1
                    ? "Identité"
                    : stepNumber === 2
                    ? "Entreprise"
                    : "Paiement"}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`flex-1 h-1 ${
                    step > stepNumber ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step !== 1.5 && renderProgressSteps()}

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {isEmailVerified && (
              <div className="flex items-center mt-1 text-green-600 text-sm">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Email vérifié
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone (optionnel)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nom de l'entreprise</Label>
            <Input
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>

          <Button 
            type="button" 
            onClick={nextStep} 
            className="w-full"
            disabled={!formData.email || !formData.firstName || !formData.lastName || !formData.companyName}
          >
            {isEmailVerified ? "Continuer" : "Vérifier l'email"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Étape intermédiaire : Vérification d'email */}
      {step === 1.5 && (
        <EmailVerification 
          email={formData.email} 
          onVerified={handleEmailVerified} 
          onBack={prevStep}
        />
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sector">Secteur d'activité</Label>
            <Select
              name="sector"
              value={formData.sector}
              onValueChange={(value) => setFormData({ ...formData, sector: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TECH">Technologie</SelectItem>
                <SelectItem value="AGRO">Agriculture</SelectItem>
                <SelectItem value="COMMERCE">Commerce</SelectItem>
                <SelectItem value="FINANCE">Finance</SelectItem>
                <SelectItem value="SANTE">Santé</SelectItem>
                <SelectItem value="EDUCATION">Éducation</SelectItem>
                <SelectItem value="AUTRE">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Taille de l'entreprise</Label>
            <Select
              name="companySize"
              value={formData.companySize}
              onValueChange={(value) => setFormData({ ...formData, companySize: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la taille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LESS_THAN_10">Moins de 10 employés</SelectItem>
                <SelectItem value="BETWEEN_10_50">10 à 50 employés</SelectItem>
                <SelectItem value="BETWEEN_50_250">50 à 250 employés</SelectItem>
                <SelectItem value="MORE_THAN_250">Plus de 250 employés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Besoins de l'entreprise</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="need-brand"
                  checked={formData.companyNeeds.includes("PRESENTATION_MARQUE")}
                  onCheckedChange={(checked) => handleNeedChange("PRESENTATION_MARQUE", checked as boolean)}
                />
                <Label htmlFor="need-brand">Présentation de marque</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="need-b2b"
                  checked={formData.companyNeeds.includes("RESEAU_B2B")}
                  onCheckedChange={(checked) => handleNeedChange("RESEAU_B2B", checked as boolean)}
                />
                <Label htmlFor="need-b2b">Réseau B2B</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="need-recruitment"
                  checked={formData.companyNeeds.includes("RECRUTEMENT")}
                  onCheckedChange={(checked) => handleNeedChange("RECRUTEMENT", checked as boolean)}
                />
                <Label htmlFor="need-recruitment">Recrutement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="need-markets"
                  checked={formData.companyNeeds.includes("MARCHES")}
                  onCheckedChange={(checked) => handleNeedChange("MARCHES", checked as boolean)}
                />
                <Label htmlFor="need-markets">Marchés</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="need-suppliers"
                  checked={formData.companyNeeds.includes("FOURNISSEURS")}
                  onCheckedChange={(checked) => handleNeedChange("FOURNISSEURS", checked as boolean)}
                />
                <Label htmlFor="need-suppliers">Fournisseurs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="need-financing"
                  checked={formData.companyNeeds.includes("FINANCEMENT")}
                  onCheckedChange={(checked) => handleNeedChange("FINANCEMENT", checked as boolean)}
                />
                <Label htmlFor="need-financing">Financement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="need-other"
                  checked={formData.companyNeeds.includes("AUTRE")}
                  onCheckedChange={(checked) => handleNeedChange("AUTRE", checked as boolean)}
                />
                <Label htmlFor="need-other">Autre</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Retour
            </Button>
            <Button type="button" onClick={nextStep}>
              Continuer
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyChallenges">Défis actuels de l'entreprise</Label>
            <Textarea
              id="companyChallenges"
              name="companyChallenges"
              placeholder="Décrivez les défis auxquels votre entreprise fait face actuellement"
              value={formData.companyChallenges}
              onChange={(e) => setFormData({ ...formData, companyChallenges: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referralSource">Comment avez-vous entendu parler de nous?</Label>
            <Select
              name="referralSource"
              value={formData.referralSource}
              onValueChange={(value) => setFormData({ ...formData, referralSource: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOCIAL_MEDIA">Réseaux sociaux</SelectItem>
                <SelectItem value="SEARCH">Moteur de recherche</SelectItem>
                <SelectItem value="FRIEND">Recommandation</SelectItem>
                <SelectItem value="EVENT">Événement</SelectItem>
                <SelectItem value="OTHER">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscribedToNewsletter"
              name="subscribedToNewsletter"
              checked={formData.subscribedToNewsletter}
              onCheckedChange={(checked) => setFormData({ ...formData, subscribedToNewsletter: checked as boolean })}
            />
            <Label htmlFor="subscribedToNewsletter">Je souhaite recevoir la newsletter</Label>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Informations bancaires</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Vos informations bancaires sont nécessaires pour réserver votre place, mais vous ne serez pas débité
              pendant la période d'essai gratuit.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Date d'expiration</Label>
                  <Input id="expiryDate" placeholder="MM/AA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Nom sur la carte</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                J'accepte les{" "}
                <Link href="#" className="text-primary hover:underline">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link href="#" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>
              </Label>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Retour
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                "Finaliser l'inscription"
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}