import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Users, Building2, Calendar, Mail, Globe, Shield, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Design amélioré avec ombre et meilleur contraste */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Catch Up!
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-sm font-medium text-zinc-900 hover:text-primary transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#benefits" className="text-sm font-medium text-zinc-900 hover:text-primary transition-colors">
              Avantages
            </Link>
            <Link href="#faq" className="text-sm font-medium text-zinc-900 hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/register">
              <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Essai Gratuit
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Design amélioré avec dégradé et effets visuels */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  <span className="font-medium">Lancé en 2025</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-zinc-900">
                  Connectez-vous. <br className="hidden sm:inline" />
                  <span className="text-primary">Collaborez.</span> Réussissez.
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                  La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités d'affaires durables.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/register">
                  <Button size="lg" className="gap-1.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Réservez votre place <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="gap-1.5 transition-all">
                    Découvrir
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                  <div className="w-8 h-8 rounded-full bg-primary/40"></div>
                  <div className="w-8 h-8 rounded-full bg-primary/60"></div>
                </div>
                <p className="text-sm text-muted-foreground">Rejoint par +500 professionnels</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-primary/20 to-background rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3 bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur">
                    <div className="inline-flex mb-2 justify-center items-center p-2 bg-primary/10 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-zinc-900">1 mois d'essai gratuit</p>
                    <p className="text-muted-foreground font-medium">Places limitées</p>
                    <Link href="/register">
                      <Button className="mt-2 w-full shadow hover:shadow-md transition-all">
                        Réserver maintenant
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Design amélioré avec icônes plus attrayantes */}
      <section id="features" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="font-medium">Fonctionnalités</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-900">
                Une plateforme complète pour votre succès professionnel
              </h2>
              <p className="text-muted-foreground text-lg">
                Découvrez comment notre plateforme peut transformer votre réseau professionnel et accélérer votre croissance
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-start space-y-3 border p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Réseautage Ciblé</h3>
              <p className="text-muted-foreground">
                Connectez-vous avec des professionnels et des entreprises de votre secteur grâce à notre algorithme de matching avancé.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-3 border p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Opportunités B2B</h3>
              <p className="text-muted-foreground">
                Trouvez des partenaires commerciaux, fournisseurs et clients potentiels adaptés à vos besoins spécifiques.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-3 border p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Événements Exclusifs</h3>
              <p className="text-muted-foreground">
                Participez à des événements de networking et des formations exclusives pour développer vos compétences.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-3 border p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Visibilité Internationale</h3>
              <p className="text-muted-foreground">
                Étendez votre présence professionnelle au-delà des frontières et accédez à un réseau mondial.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-3 border p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Sécurité des Données</h3>
              <p className="text-muted-foreground">
                Vos informations professionnelles sont protégées avec les standards de sécurité les plus élevés.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-3 border p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Analytics Avancés</h3>
              <p className="text-muted-foreground">
                Suivez et analysez vos interactions et opportunités avec des outils d'analyse intuitifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Design amélioré avec meilleures cartes */}
      <section id="benefits" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-muted/80 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="font-medium">Avantages</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-900">
                Pourquoi nous choisir
              </h2>
              <p className="text-muted-foreground text-lg">
                Les avantages qui font la différence pour votre carrière ou votre entreprise
              </p>
            </div>
          </div>
          <div className="grid gap-8 mt-16 md:grid-cols-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-muted/20">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-900">Pour les Professionnels</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Accédez à des opportunités de mentorat exclusives</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Développez vos compétences avec des formations ciblées</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Élargissez votre réseau professionnel stratégiquement</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Trouvez des opportunités d'emploi cachées</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-muted/20">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-900">Pour les Entreprises</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Présentez votre marque à un public ciblé et qualifié</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Développez votre réseau B2B stratégiquement</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Trouvez des talents qualifiés pour vos besoins</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">Accédez à de nouveaux marchés et financements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Design amélioré avec meilleur contraste */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="font-medium">Offre limitée</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-zinc-900">
                Prêt à transformer votre réseau professionnel?
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                Réservez votre place pour un essai gratuit d'un mois et découvrez tous les avantages de notre plateforme.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-md">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-1.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  Réserver maintenant <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                  En savoir plus
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Aucun engagement, annulez à tout moment
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - Design amélioré avec accordéon visuel */}
      <section id="faq" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="font-medium">FAQ</span>
            </div>
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-900">
                Questions fréquentes
              </h2>
              <p className="text-muted-foreground text-lg">
                Trouvez les réponses à vos questions
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-lg text-zinc-900">Qu'est-ce qui est inclus dans l'essai gratuit?</h3>
              <p className="mt-2 text-muted-foreground">
                L'essai gratuit d'un mois vous donne accès à toutes les fonctionnalités de la plateforme sans restriction, y compris les événements exclusifs et les opportunités de networking.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-lg text-zinc-900">Comment fonctionne l'inscription?</h3>
              <p className="mt-2 text-muted-foreground">
                Remplissez simplement le formulaire d'inscription, choisissez votre profil (professionnel ou entreprise) et suivez les étapes guidées pour compléter votre profil et commencer à explorer la plateforme.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-lg text-zinc-900">Dois-je fournir mes informations bancaires?</h3>
              <p className="mt-2 text-muted-foreground">
                Oui, mais vous ne serez pas débité pendant la période d'essai. Vous pourrez annuler à tout moment avant la fin de l'essai gratuit sans aucun frais.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-lg text-zinc-900">Quand la plateforme sera-t-elle officiellement lancée?</h3>
              <p className="mt-2 text-muted-foreground">
                La version complète sera lancée après la phase d'essai. Les early adopters bénéficieront d'avantages exclusifs, dont une réduction de 30% sur l'abonnement annuel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Design amélioré avec meilleur formulaire */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-center max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                <span className="font-medium">Newsletter</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-zinc-900">Restez informé</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles, mises à jour et offres exclusives.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Conseils de réseautage professionnels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Invitations aux événements exclusifs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Opportunités professionnelles exclusives</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      placeholder="nom@example.com"
                      className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Jean Dupont"
                    className="w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Button type="submit" className="w-full shadow hover:shadow-md transition-all">
                  S'abonner à la newsletter
                </Button>
                <p className="text-xs text-center text-muted-foreground pt-2">
                  En vous inscrivant, vous acceptez notre politique de confidentialité.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* Footer - Design amélioré avec plus d'informations */}
       <footer className="border-t py-12 bg-zinc-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Catch Up
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plateforme qui connecte les professionnels et les entreprises pour créer des opportunités d'affaires.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Plateforme</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="#benefits" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Avantages
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Tarification
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Entreprise</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Carrières
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Légal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t mt-8 pt-8">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Catch Up. Tous droits réservés.
            </p>
            <div className="flex gap-4">
                         <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
  )}
