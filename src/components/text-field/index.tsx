import { InputHTMLAttributes, useState } from 'react';

import { SmallText, StyledInput, Wrapper } from './styles';

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
      <StyledInput
        inFocus={inFocus}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <SmallText>Testando de teste</SmallText>
    </Wrapper>
  )
}
