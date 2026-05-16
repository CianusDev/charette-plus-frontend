import { useId, useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/shared/components/ui/field'
import { Input } from '#/shared/components/ui/input'
import { cn } from '#/shared/lib/utils'

interface FormInputProps extends React.ComponentProps<'input'> {
  label: string
  description?: string
  error?: string
  containerClassName?: string
}

export function FormInput({
  label,
  description,
  error,
  containerClassName,
  id,
  type,
  ...props
}: FormInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isPassword = type === 'password'
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field
      data-invalid={error ? true : undefined}
      className={cn('flex flex-col gap-1', containerClassName)}
    >
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      {isPassword ? (
        <div className="relative">
          <Input
            id={inputId}
            aria-invalid={!!error}
            type={showPassword ? 'text' : 'password'}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
            aria-label={
              showPassword
                ? 'Cacher le mot de passe'
                : 'Afficher le mot de passe'
            }
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </button>
        </div>
      ) : (
        <Input id={inputId} aria-invalid={!!error} type={type} {...props} />
      )}

      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}
