import { ChangeEvent, useState } from 'react';
import CopyIcon from '../../assets/copyIcon.svg?react';
import { usePasswordGenerator, GeneratePasswordProps } from './usePasswordGenerator.tsx';

import styles from './PasswordGenerator.module.scss';

interface Props {
  minPasswordLength?: number | string;
  maxPasswordLength?: number | string;
}

const checkboxOptions = [
  { label: 'Include Lowercase', key: 'lowercase' },
  { label: 'Include Uppercase', key: 'uppercase' },
  { label: 'Include Numbers', key: 'numbers' },
  { label: 'Include Symbols', key: 'symbols' },
];

export const PasswordGenerator = ({ minPasswordLength = 6, maxPasswordLength = 30 }: Props) => {
  const [passwordLength, setPasswordLength] = useState(10);
  const { password, generatePassword } = usePasswordGenerator();
  const [generatorOptions, setGeneratorOptions] = useState<GeneratePasswordProps>({ lowercase: true });
  const [showCopiedTextMessage, setShowCopiedTextMessage] = useState(false);
  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => setPasswordLength(Number(e.target.value));

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id as keyof typeof generatorOptions;
    setGeneratorOptions((prev) => {
      const hasTrulyEntries = Object.values(prev).filter((value) => value);
      const checked = e.target.checked;
      return hasTrulyEntries.length > 1 || checked ? { ...prev, [key]: e.target.checked } : prev;
    });
  };

  const handlePasswordGenerate = () => {
    generatePassword(generatorOptions, passwordLength);
  };

  const handlePasswordCopy = async () => {
    if (password.length) {
      await navigator.clipboard.writeText(password);
      setShowCopiedTextMessage(true);
      setTimeout(() => {
        setShowCopiedTextMessage(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.self}>
      <div className={styles.innerContent}>
        <label className={styles.generatedPassword}>
          <input type="text" value={password} readOnly />
          <CopyIcon onClick={handlePasswordCopy} />
        </label>
        <div className={styles.passwordCopied} style={{ opacity: showCopiedTextMessage ? '1' : '0' }}>
          <p>Password copied!</p>
        </div>
        <div className={styles.rangeInputRow}>
          <h3>Character length {passwordLength}</h3>
          <input
            type="range"
            min={minPasswordLength}
            max={maxPasswordLength}
            value={passwordLength}
            onChange={handleLengthChange}
          />
        </div>
        <div className={styles.checkboxGroup}>
          {checkboxOptions.map((item) => (
            <div key={item.key}>
              <input
                id={item.key}
                type="checkbox"
                checked={!!generatorOptions[item.key as keyof typeof generatorOptions]}
                onChange={handleOptionChange}
              />
              <label htmlFor={item.key}>{item.label}</label>
            </div>
          ))}
        </div>
        <button className={styles.generatePasswordButton} onClick={handlePasswordGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
};
