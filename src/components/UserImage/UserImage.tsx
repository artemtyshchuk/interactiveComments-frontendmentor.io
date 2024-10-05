import styles from "./UserImage.module.scss";

interface UserImageProps {
  image: string;
  alt: string;
  inputImage?: boolean;
}
export const UserImage = ({ image, alt, inputImage }: UserImageProps) => {
  return (
    <img
      src={image}
      alt={alt}
      className={`${
        inputImage ? styles.userImage : styles.userImageReply
      }`}
    />
  );
};
