import { defineComponent, PropType, reactive } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { RadioContext, RadioProvider, useRadioGroupContext } from './radio-context'

export type RadioProps = Omit<HTMLArkProps<'label'>, keyof RadioContext> & RadioContext

export const Radio: ComponentWithProps<RadioProps> = defineComponent({
  name: 'Radio',
  props: {
    value: {
      type: String as PropType<RadioProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<RadioProps['disabled']>,
    },
    invalid: {
      type: Boolean as PropType<RadioProps['invalid']>,
    },
    readOnly: {
      type: Boolean as PropType<RadioProps['readOnly']>,
    },
  },
  setup(props, { slots, attrs }) {
    const groupApi = useRadioGroupContext()

    const providerProps = reactive<RadioProps>({
      value: props.value,
      disabled: props.disabled,
      invalid: props.invalid,
      readOnly: props.readOnly,
    })

    RadioProvider(providerProps)

    return () => (
      <ark.label
        {...groupApi.value.getRadioProps({ value: props.value, disabled: props.disabled })}
        {...attrs}
      >
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})