import { InputHTMLAttributes, useState } from 'react';

import { Input, SmallText, Wrapper } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onFocus?: () => void
  onBlur?: () => void
}

export function TextField({ onFocus, onBlur, ...rest }: Props) {
  const [inFocus, setInFocus] = useState(false)

  function handleFocus() {
    setInFocus(true)
    onFocus?.()
  }
  function handleBlur() {
    setInFocus(false)
    onBlur?.()
  }

  return (
    <Wrapper>
      <Input
        inFocus={inFocus}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <SmallText>Testando de teste</SmallText>
    </Wrapper>
  )
}
