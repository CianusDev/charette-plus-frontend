import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { ImageUploadField } from '#/features/uploads/components/image-upload-field'
import { FormInput } from '#/shared/components/form-inputs'
import { Button } from '#/shared/components/ui/button'
import { FieldDescription, FieldLabel } from '#/shared/components/ui/field'
import { Input } from '#/shared/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '#/shared/components/ui/tabs'
import { Textarea } from '#/shared/components/ui/textarea'
import { RepeatableList } from './repeatable-list'
import type { UploadedImage } from '#/features/uploads/uploads.service'
import type { SiteContent, SiteContentPayload } from '../site-content.types'

interface SiteContentFormProps {
  content: SiteContent
  onSubmit: (payload: SiteContentPayload) => Promise<void>
}

interface EditableAdvantage {
  icon: string
  title: string
  text: string
}

interface EditableValue {
  title: string
  text: string
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-brand">
      <header>
        <h2 className="text-xl font-semibold text-navy">{title}</h2>
        {description ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

function TextareaField({
  label,
  description,
  value,
  rows = 3,
  onChange,
}: {
  label: string
  description?: string
  value: string
  rows?: number
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <FieldLabel>{label}</FieldLabel>
      <Textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </div>
  )
}

export function SiteContentForm({ content, onSubmit }: SiteContentFormProps) {
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState(content)
  const [advantages, setAdvantages] = useState<Array<EditableAdvantage>>(
    content.advantages.map(({ icon, title, text }) => ({ icon, title, text })),
  )
  const [values, setValues] = useState<Array<EditableValue>>(
    content.aboutValues.map(({ title, text }) => ({ title, text })),
  )
  const [heroImage, setHeroImage] = useState<UploadedImage | null>(
    content.heroImageUrl
      ? { url: content.heroImageUrl, publicId: content.heroImagePublicId ?? '' }
      : null,
  )
  const [aboutImage, setAboutImage] = useState<UploadedImage | null>(
    content.aboutImageUrl
      ? {
          url: content.aboutImageUrl,
          publicId: content.aboutImagePublicId ?? '',
        }
      : null,
  )

  const set = <TKey extends keyof SiteContent>(
    key: TKey,
    value: SiteContent[TKey],
  ) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const setListItem = <TItem,>(
    list: Array<TItem>,
    index: number,
    changes: Partial<TItem>,
  ): Array<TItem> =>
    list.map((item, i) => (i === index ? { ...item, ...changes } : item))

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const emptyAdvantage = advantages.some(
      (a) => !a.icon.trim() || !a.title.trim() || !a.text.trim(),
    )
    const emptyValue = values.some((v) => !v.title.trim() || !v.text.trim())
    if (emptyAdvantage || emptyValue) {
      toast.error('Chaque avantage et chaque valeur doit être entièrement rempli')
      return
    }

    startTransition(async () => {
      await onSubmit({
        whatsappNumber: form.whatsappNumber.trim(),
        whatsappDisplay: form.whatsappDisplay.trim(),
        city: form.city.trim(),
        country: form.country.trim(),
        openingHours: form.openingHours.trim(),
        defaultWhatsappMessage: form.defaultWhatsappMessage.trim(),
        orderWhatsappMessage: form.orderWhatsappMessage.trim(),

        heroBadge: form.heroBadge.trim(),
        heroTitleBefore: form.heroTitleBefore.trim(),
        heroTitleHighlight: form.heroTitleHighlight.trim(),
        heroTitleAfter: form.heroTitleAfter.trim(),
        heroSubtitle: form.heroSubtitle.trim(),
        heroSteps: form.heroSteps.map((step) => step.trim()).filter(Boolean),
        heroPrimaryCta: form.heroPrimaryCta.trim(),
        heroSecondaryCta: form.heroSecondaryCta.trim(),
        heroImageUrl: heroImage?.url,
        heroImagePublicId: heroImage?.publicId || undefined,
        heroFloatTitle: form.heroFloatTitle.trim(),
        heroFloatText: form.heroFloatText.trim(),

        kitsLabel: form.kitsLabel.trim(),
        kitsTitle: form.kitsTitle.trim(),
        kitsIntro: form.kitsIntro.trim(),
        kitsCtaLabel: form.kitsCtaLabel.trim(),
        kitsPageTitle: form.kitsPageTitle.trim(),
        kitsPageIntro: form.kitsPageIntro.trim(),

        advantagesLabel: form.advantagesLabel.trim(),
        advantagesTitle: form.advantagesTitle.trim(),
        advantagesIntro: form.advantagesIntro.trim(),
        advantages: advantages.map((advantage, position) => ({
          icon: advantage.icon.trim(),
          title: advantage.title.trim(),
          text: advantage.text.trim(),
          position,
        })),

        aboutLabel: form.aboutLabel.trim(),
        aboutTitle: form.aboutTitle.trim(),
        aboutParagraphs: form.aboutParagraphs
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
        aboutImageUrl: aboutImage?.url,
        aboutImagePublicId: aboutImage?.publicId || undefined,
        aboutValues: values.map((value, position) => ({
          title: value.title.trim(),
          text: value.text.trim(),
          position,
        })),

        contactLabel: form.contactLabel.trim(),
        contactTitle: form.contactTitle.trim(),
        contactIntro: form.contactIntro.trim(),
        contactCardTitle: form.contactCardTitle.trim(),
        contactWhatsappTitle: form.contactWhatsappTitle.trim(),
        contactWhatsappText: form.contactWhatsappText.trim(),
        contactWhatsappCta: form.contactWhatsappCta.trim(),

        footerDescription: form.footerDescription.trim(),
      })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-24">
      <Tabs defaultValue="coordonnees" className="gap-6">
        <div className="-mx-1 overflow-x-auto px-1">
          <TabsList className="w-max">
            <TabsTrigger value="coordonnees">Coordonnées</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="filieres">Filières</TabsTrigger>
            <TabsTrigger value="avantages">Avantages</TabsTrigger>
            <TabsTrigger value="a-propos">À propos</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="footer">Pied de page</TabsTrigger>
          </TabsList>
        </div>

          <TabsContent value="coordonnees">
      <Section
        title="Coordonnées"
        description="Utilisées dans le header, le footer, la section contact et tous les liens WhatsApp."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            label="Numéro WhatsApp"
            description="Format international sans + ni espace, ex. 2250171224359"
            value={form.whatsappNumber}
            onChange={(e) => set('whatsappNumber', e.target.value)}
          />
          <FormInput
            label="Numéro affiché"
            value={form.whatsappDisplay}
            onChange={(e) => set('whatsappDisplay', e.target.value)}
          />
          <FormInput
            label="Ville"
            value={form.city}
            onChange={(e) => set('city', e.target.value)}
          />
          <FormInput
            label="Pays"
            value={form.country}
            onChange={(e) => set('country', e.target.value)}
          />
        </div>
        <FormInput
          label="Horaires"
          value={form.openingHours}
          onChange={(e) => set('openingHours', e.target.value)}
        />
        <TextareaField
          label="Message WhatsApp par défaut"
          description="Pré-rempli depuis le bouton flottant et le footer."
          value={form.defaultWhatsappMessage}
          onChange={(v) => set('defaultWhatsappMessage', v)}
        />
        <TextareaField
          label="Message WhatsApp de commande"
          description="Pré-rempli depuis le bouton « Commander » du header."
          value={form.orderWhatsappMessage}
          onChange={(v) => set('orderWhatsappMessage', v)}
        />
      </Section>
          </TabsContent>

          <TabsContent value="hero">
      <Section title="Hero" description="La première section de la page d'accueil.">
        <FormInput
          label="Badge"
          value={form.heroBadge}
          onChange={(e) => set('heroBadge', e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <FormInput
            label="Titre — 1re ligne"
            value={form.heroTitleBefore}
            onChange={(e) => set('heroTitleBefore', e.target.value)}
          />
          <FormInput
            label="Titre — ligne orange"
            value={form.heroTitleHighlight}
            onChange={(e) => set('heroTitleHighlight', e.target.value)}
          />
          <FormInput
            label="Titre — 3e ligne"
            value={form.heroTitleAfter}
            onChange={(e) => set('heroTitleAfter', e.target.value)}
          />
        </div>
        <TextareaField
          label="Sous-titre"
          value={form.heroSubtitle}
          onChange={(v) => set('heroSubtitle', v)}
        />

        <RepeatableList
          label="Étapes"
          description="Les puces numérotées sous le sous-titre."
          items={form.heroSteps}
          addLabel="Ajouter une étape"
          max={5}
          onAdd={() => set('heroSteps', [...form.heroSteps, ''])}
          onRemove={(index) =>
            set(
              'heroSteps',
              form.heroSteps.filter((_, i) => i !== index),
            )
          }
          renderItem={(step, index) => (
            <Input
              value={step}
              placeholder={`Étape ${index + 1}`}
              onChange={(e) =>
                set(
                  'heroSteps',
                  form.heroSteps.map((s, i) => (i === index ? e.target.value : s)),
                )
              }
            />
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            label="Bouton principal"
            value={form.heroPrimaryCta}
            onChange={(e) => set('heroPrimaryCta', e.target.value)}
          />
          <FormInput
            label="Bouton secondaire"
            value={form.heroSecondaryCta}
            onChange={(e) => set('heroSecondaryCta', e.target.value)}
          />
          <FormInput
            label="Encart — titre"
            value={form.heroFloatTitle}
            onChange={(e) => set('heroFloatTitle', e.target.value)}
          />
          <FormInput
            label="Encart — texte"
            value={form.heroFloatText}
            onChange={(e) => set('heroFloatText', e.target.value)}
          />
        </div>

        <ImageUploadField
          label="Image du hero"
          value={heroImage?.url ?? null}
          folder="site"
          onChange={setHeroImage}
        />
      </Section>
          </TabsContent>

          <TabsContent value="filieres">
      <Section title="Section filières" description="L'en-tête au-dessus des kits.">
        <FormInput
          label="Sur-titre"
          value={form.kitsLabel}
          onChange={(e) => set('kitsLabel', e.target.value)}
        />
        <FormInput
          label="Titre"
          value={form.kitsTitle}
          onChange={(e) => set('kitsTitle', e.target.value)}
        />
        <TextareaField
          label="Introduction"
          value={form.kitsIntro}
          onChange={(v) => set('kitsIntro', v)}
        />
        <FormInput
          label="Bouton vers le catalogue"
          description="Affiché sous les kits mis en avant sur l'accueil."
          value={form.kitsCtaLabel}
          onChange={(e) => set('kitsCtaLabel', e.target.value)}
        />
        <div className="border-t border-sand-200 pt-4">
          <p className="mb-3 text-sm font-semibold text-navy">
            Page catalogue (/kits)
          </p>
          <div className="flex flex-col gap-4">
            <FormInput
              label="Titre de la page"
              value={form.kitsPageTitle}
              onChange={(e) => set('kitsPageTitle', e.target.value)}
            />
            <TextareaField
              label="Introduction de la page"
              value={form.kitsPageIntro}
              onChange={(v) => set('kitsPageIntro', v)}
            />
          </div>
        </div>
      </Section>
          </TabsContent>

          <TabsContent value="avantages">
      <Section title="Section avantages">
        <FormInput
          label="Sur-titre"
          value={form.advantagesLabel}
          onChange={(e) => set('advantagesLabel', e.target.value)}
        />
        <FormInput
          label="Titre"
          value={form.advantagesTitle}
          onChange={(e) => set('advantagesTitle', e.target.value)}
        />
        <TextareaField
          label="Introduction"
          value={form.advantagesIntro}
          onChange={(v) => set('advantagesIntro', v)}
        />

        <RepeatableList
          label="Cartes"
          description="Une icône (emoji), un titre et un texte par carte."
          items={advantages}
          addLabel="Ajouter un avantage"
          max={12}
          onAdd={() =>
            setAdvantages([...advantages, { icon: '✨', title: '', text: '' }])
          }
          onRemove={(index) =>
            setAdvantages(advantages.filter((_, i) => i !== index))
          }
          renderItem={(advantage, index) => (
            <div className="flex flex-col gap-2">
              <div className="grid gap-2 sm:grid-cols-[80px_1fr]">
                <Input
                  value={advantage.icon}
                  placeholder="📦"
                  aria-label="Icône"
                  onChange={(e) =>
                    setAdvantages(
                      setListItem(advantages, index, { icon: e.target.value }),
                    )
                  }
                />
                <Input
                  value={advantage.title}
                  placeholder="Titre"
                  aria-label="Titre"
                  onChange={(e) =>
                    setAdvantages(
                      setListItem(advantages, index, { title: e.target.value }),
                    )
                  }
                />
              </div>
              <Textarea
                rows={2}
                value={advantage.text}
                placeholder="Texte"
                aria-label="Texte"
                onChange={(e) =>
                  setAdvantages(
                    setListItem(advantages, index, { text: e.target.value }),
                  )
                }
              />
            </div>
          )}
        />
      </Section>
          </TabsContent>

          <TabsContent value="a-propos">
      <Section title="Section à propos">
        <FormInput
          label="Sur-titre"
          value={form.aboutLabel}
          onChange={(e) => set('aboutLabel', e.target.value)}
        />
        <FormInput
          label="Titre"
          value={form.aboutTitle}
          onChange={(e) => set('aboutTitle', e.target.value)}
        />

        <RepeatableList
          label="Paragraphes"
          items={form.aboutParagraphs}
          addLabel="Ajouter un paragraphe"
          max={6}
          onAdd={() => set('aboutParagraphs', [...form.aboutParagraphs, ''])}
          onRemove={(index) =>
            set(
              'aboutParagraphs',
              form.aboutParagraphs.filter((_, i) => i !== index),
            )
          }
          renderItem={(paragraph, index) => (
            <Textarea
              rows={4}
              value={paragraph}
              onChange={(e) =>
                set(
                  'aboutParagraphs',
                  form.aboutParagraphs.map((p, i) =>
                    i === index ? e.target.value : p,
                  ),
                )
              }
            />
          )}
        />

        <RepeatableList
          label="Valeurs"
          description="Les encarts affichés sous les paragraphes."
          items={values}
          addLabel="Ajouter une valeur"
          max={8}
          onAdd={() => setValues([...values, { title: '', text: '' }])}
          onRemove={(index) => setValues(values.filter((_, i) => i !== index))}
          renderItem={(value, index) => (
            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                value={value.title}
                placeholder="Titre"
                aria-label="Titre"
                onChange={(e) =>
                  setValues(
                    setListItem(values, index, { title: e.target.value }),
                  )
                }
              />
              <Input
                value={value.text}
                placeholder="Texte"
                aria-label="Texte"
                onChange={(e) =>
                  setValues(setListItem(values, index, { text: e.target.value }))
                }
              />
            </div>
          )}
        />

        <ImageUploadField
          label="Image à propos"
          value={aboutImage?.url ?? null}
          folder="site"
          onChange={setAboutImage}
        />
      </Section>
          </TabsContent>

          <TabsContent value="contact">
      <Section title="Section contact">
        <FormInput
          label="Sur-titre"
          value={form.contactLabel}
          onChange={(e) => set('contactLabel', e.target.value)}
        />
        <FormInput
          label="Titre"
          value={form.contactTitle}
          onChange={(e) => set('contactTitle', e.target.value)}
        />
        <TextareaField
          label="Introduction"
          value={form.contactIntro}
          onChange={(v) => set('contactIntro', v)}
        />
        <FormInput
          label="Titre de la carte coordonnées"
          value={form.contactCardTitle}
          onChange={(e) => set('contactCardTitle', e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            label="Bloc WhatsApp — titre"
            value={form.contactWhatsappTitle}
            onChange={(e) => set('contactWhatsappTitle', e.target.value)}
          />
          <FormInput
            label="Bloc WhatsApp — bouton"
            value={form.contactWhatsappCta}
            onChange={(e) => set('contactWhatsappCta', e.target.value)}
          />
        </div>
        <TextareaField
          label="Bloc WhatsApp — texte"
          value={form.contactWhatsappText}
          onChange={(v) => set('contactWhatsappText', v)}
        />
      </Section>
          </TabsContent>

          <TabsContent value="footer">
      <Section title="Pied de page">
        <TextareaField
          label="Description"
          value={form.footerDescription}
          onChange={(v) => set('footerDescription', v)}
        />
      </Section>
          </TabsContent>
      </Tabs>

      <div className="sticky bottom-4 flex justify-end">
        <Button type="submit" size="lg" loading={isPending}>
          Enregistrer le contenu
        </Button>
      </div>
    </form>
  )
}
