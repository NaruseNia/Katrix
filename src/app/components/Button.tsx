"use client"

import {ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren} from "react";
import styled from "styled-components";

export const Button = (
  props:
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement>
) => {
  return (
    <ButtonWrapper {...props} />
  )
}

const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 12px;
  max-height: 40px;
  width: 180px;
  color: var(--white);
  font-weight: normal;
  font-size: 1.2rem;
  border: solid 2px var(--gray);
  border-radius: 6px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`;