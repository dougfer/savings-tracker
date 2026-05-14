import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';

type InputVariant = 'outline' | 'underlined' | 'rounded';
type InputSize = 'sm' | 'md' | 'lg';

type AppInputCtx = {
  variant: InputVariant;
  size: InputSize;
  isInvalid: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  isReadOnly: boolean;
};

const AppInputContext = createContext<AppInputCtx | null>(null);

function useAppInputCtx(): AppInputCtx {
  const ctx = useContext(AppInputContext);
  if (!ctx) throw new Error('AppInput subcomponents must be used inside <AppInput>');
  return ctx;
}

const inputVariantCls: Record<InputVariant, string> = {
  outline: 'border border-input rounded-md',
  underlined: 'border-b border-input rounded-none',
  rounded: 'border border-input rounded-full',
};

const inputSizeCls: Record<InputSize, string> = {
  sm: 'min-h-[36px] px-3',
  md: 'min-h-[44px] px-4',
  lg: 'min-h-[52px] px-5',
};

const fieldSizeCls: Record<InputSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body',
  lg: 'text-body',
};

type AppInputRootProps = {
  variant?: InputVariant;
  size?: InputSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  className?: string;
  children: ReactNode;
};

function AppInputRoot({
  variant = 'outline',
  size = 'md',
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  className,
  children,
}: AppInputRootProps) {
  return (
    <AppInputContext.Provider value={{ variant, size, isInvalid, isDisabled, isRequired, isReadOnly }}>
      <FormControl
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        className={['w-full', className].filter(Boolean).join(' ')}
      >
        {children}
      </FormControl>
    </AppInputContext.Provider>
  );
}

function AppInputLabel({ className, ...props }: ComponentProps<typeof FormControlLabelText>) {
  const cls = ['text-body-sm font-sans-semibold text-foreground mb-1', className]
    .filter(Boolean)
    .join(' ');
  return (
    <FormControlLabel>
      <FormControlLabelText {...props} className={cls} />
    </FormControlLabel>
  );
}

/**
 * Renders the Input container + InputField together.
 * For slot/icon usage, compose directly with Gluestack InputSlot/InputIcon inside.
 */
function AppInputField({ className, ...props }: ComponentProps<typeof InputField>) {
  const { variant, size, isInvalid, isDisabled, isReadOnly } = useAppInputCtx();
  const inputCls = [
    inputVariantCls[variant],
    inputSizeCls[size],
    isInvalid ? 'border-destructive' : '',
    isDisabled ? 'opacity-40' : '',
    isReadOnly ? 'bg-muted' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const fieldCls = [fieldSizeCls[size], 'text-foreground', className].filter(Boolean).join(' ');
  return (
    <Input className={inputCls}>
      <InputField {...props} className={fieldCls} />
    </Input>
  );
}

function AppInputSlot({ className, ...props }: ComponentProps<typeof InputSlot>) {
  return <InputSlot {...props} className={className} />;
}

function AppInputIcon({ className, ...props }: ComponentProps<typeof InputIcon>) {
  const cls = ['text-muted-foreground', className].filter(Boolean).join(' ');
  return <InputIcon {...props} className={cls} />;
}

function AppInputHelperText({ className, ...props }: ComponentProps<typeof FormControlHelperText>) {
  const cls = ['text-body-sm text-muted-foreground mt-1', className].filter(Boolean).join(' ');
  return (
    <FormControlHelper>
      <FormControlHelperText {...props} className={cls} />
    </FormControlHelper>
  );
}

function AppInputErrorText({ className, ...props }: ComponentProps<typeof FormControlErrorText>) {
  const cls = ['text-body-sm text-destructive mt-1', className].filter(Boolean).join(' ');
  return (
    <FormControlError>
      <FormControlErrorText {...props} className={cls} />
    </FormControlError>
  );
}

function AppInputErrorIcon({ className, ...props }: ComponentProps<typeof FormControlErrorIcon>) {
  const cls = ['text-destructive', className].filter(Boolean).join(' ');
  return (
    <FormControlError>
      <FormControlErrorIcon {...props} className={cls} />
    </FormControlError>
  );
}

AppInputRoot.displayName = 'AppInput';
AppInputLabel.displayName = 'AppInput.Label';
AppInputField.displayName = 'AppInput.Field';
AppInputSlot.displayName = 'AppInput.Slot';
AppInputIcon.displayName = 'AppInput.Icon';
AppInputHelperText.displayName = 'AppInput.HelperText';
AppInputErrorText.displayName = 'AppInput.ErrorText';
AppInputErrorIcon.displayName = 'AppInput.ErrorIcon';

export const AppInput = Object.assign(AppInputRoot, {
  Label: AppInputLabel,
  Field: AppInputField,
  Slot: AppInputSlot,
  Icon: AppInputIcon,
  HelperText: AppInputHelperText,
  ErrorText: AppInputErrorText,
  ErrorIcon: AppInputErrorIcon,
});
