import { useState } from 'react';

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = "!@#$%^&*()_+{}|[]\\;',./<>?";

export interface GeneratePasswordProps {
  lowercase?: boolean;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

const defaultLength = 10;

export function usePasswordGenerator() {
  const [password, setPassword] = useState('');

  const generatePassword = (include: GeneratePasswordProps = {}, passwordLength: number = defaultLength) => {
    let chars = '';
    if (include.lowercase) chars += lowercaseChars;
    if (include.uppercase) chars += uppercaseChars;
    if (include.numbers) chars += numberChars;
    if (include.symbols) chars += symbolChars;

    let generatedPassword = '';

    if (chars.length) {
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += chars[randomIndex];
      }

      setPassword(generatedPassword);
    }
  };

  return { password, generatePassword };
}
