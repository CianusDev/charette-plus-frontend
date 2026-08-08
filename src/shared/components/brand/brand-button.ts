import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

/**
 * Boutons "pilule" de la charte Charette Plus.
 * Utilisable sur un <a>, un <Link> ou un <button> : `className={brandButton({ variant })}`.
 */
export const brandButton = cva(
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-orange text-white shadow-[0_4px_16px_rgb(234_91_23_/_0.35)] hover:bg-[#d04f12]',
        secondary:
          'border-2 border-sand-200 bg-white text-navy hover:border-navy',
        whatsapp: 'bg-white font-bold text-[#128c7e] hover:bg-[#f0fdf4]',
      },
      size: {
        default: '',
        sm: 'px-5 py-2.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export type BrandButtonVariants = VariantProps<typeof brandButton>
