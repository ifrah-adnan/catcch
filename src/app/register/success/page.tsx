import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 px-4 md:px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px] text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Inscription réussie!</h1>
          <p className="text-muted-foreground">
            Merci de vous être inscrit pour notre essai gratuit d'un mois. Nous avons envoyé un email de confirmation à
            votre adresse email.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/50">
            <h2 className="font-medium mb-2">Prochaines étapes</h2>
            <ul className="space-y-2 text-sm text-left list-disc list-inside">
              <li>Vérifiez votre email pour confirmer votre inscription</li>
              <li>Complétez votre profil pour une expérience personnalisée</li>
              <li>Explorez la plateforme et découvrez toutes les fonctionnalités</li>
              <li>Nous vous contacterons avant le lancement officiel</li>
            </ul>
          </div>

          <Button asChild className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
