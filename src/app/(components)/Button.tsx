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
  width: 170px;
  color: var(--white);
  font-weight: bold;
  vertical-align: center;
  border-radius: 6px;
  transition: 0.2s ease-in-out;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.25);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 25px 0 rgba(255, 255, 255, 0.25);
  }
`;