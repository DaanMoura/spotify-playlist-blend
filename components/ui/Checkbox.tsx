import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { IconCheck } from '@tabler/icons-react';

const Checkbox = (props: CheckboxPrimitive.CheckboxProps) => (
  <CheckboxPrimitive.Root {...props} className={`
    border 
    ${props.checked ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-600 border-slate-500'}
    hover:bg-emerald-600
    hover:border-emerald-500
    flex h-[24px] w-[24px] min-h-[24px] min-w-[24px]    
    appearance-none 
    items-center 
    justify-center
    rounded-full
    outline-none 
    transition
  `}>
    <CheckboxPrimitive.Indicator>
      <IconCheck size={14}/>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

export default Checkbox