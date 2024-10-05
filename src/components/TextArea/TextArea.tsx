import styles from "./TextArea.module.scss";

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  placeholder?: string;
}

export const TextArea = ({
  value,
  onChange,
  style,
  placeholder,
}: TextAreaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={onChange}
      style={style}
    />
  );
};
