"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EmailVerificationProps {
  email: string
  onVerified: () => void
  onBack: () => void
}

export default function EmailVerification({ email, onVerified, onBack }: EmailVerificationProps) {
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)

  const sendVerificationEmail = async () => {
    setIsSending(true)
    setError(null)
    
    try {
      // Générer un token de 6 chiffres
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Stocker temporairement le token dans sessionStorage
      sessionStorage.setItem(`verification_${email}`, verificationToken)
      
      // Préparer le contenu de l'email
      const emailContent = {
        to: email,
        subject: "Vérification de votre adresse email",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Vérification de votre adresse email</h2>
            <p>Merci de votre inscription ! Pour continuer, veuillez utiliser le code de vérification ci-dessous :</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
              ${verificationToken}
            </div>
            <p>Ce code est valable pendant 10 minutes.</p>
            <p>Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email.</p>
          </div>
        `
      }
      
      // Envoyer l'email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailContent)
      })
      
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'email")
      }
      
      setSuccess("Code de vérification envoyé à votre adresse email")
    } catch (err) {
      console.error("Erreur:", err)
      setError("Une erreur est survenue lors de l'envoi du code de vérification")
    } finally {
      setIsSending(false)
    }
  }

  const verifyToken = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Récupérer le token stocké
      const storedToken = sessionStorage.getItem(`verification_${email}`)
      
      if (!storedToken) {
        throw new Error("Le code de vérification a expiré. Veuillez demander un nouveau code.")
      }
      
      if (token === storedToken) {
        setIsVerified(true)
        setSuccess("Adresse email vérifiée avec succès !")
        
        // Nettoyer le token après vérification réussie
        sessionStorage.removeItem(`verification_${email}`)
        
        // Informer le composant parent que l'email est vérifié
        setTimeout(() => {
          onVerified()
        }, 1000)
      } else {
        throw new Error("Code de vérification incorrect")
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la vérification")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Vérification d'email</h3>
        <p className="text-sm text-muted-foreground">
          Nous avons besoin de vérifier votre adresse email ({email})
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="mb-4 bg-green-50 border-green-200 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {isVerified ? (
        <div className="flex flex-col items-center justify-center py-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <p className="text-center font-medium">Vérification réussie !</p>
          <p className="text-center text-sm text-muted-foreground">
            Vous allez être redirigé...
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="verificationToken">Code de vérification</Label>
            <Input
              id="verificationToken"
              placeholder="Entrez le code à 6 chiffres"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              maxLength={6}
            />
          </div>

          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={sendVerificationEmail}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer le code"
              )}
            </Button>
            <Button 
              type="button" 
              onClick={verifyToken}
              disabled={token.length !== 6 || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vérification...
                </>
              ) : (
                "Vérifier"
              )}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onBack}
              className="text-sm text-muted-foreground"
            >
              Revenir en arrière
            </Button>
          </div>
        </>
      )}
    </div>
  )
}