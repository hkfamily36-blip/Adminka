import { motion } from "motion/react";
import bookImage from "figma:asset/18f2ea4ee7928176c0ae5b9d2287a11511085513.png";

/**
 * 📚 3D КОСМИЧЕСКАЯ КНИГА
 * 
 * Заменена на красивое 3D изображение книги с галактическим порталом
 */

interface IconProps {
  size?: number;
  className?: string;
}

export const Book3DIcon = ({ size = 120, className = "" }: IconProps) => {
  const s = size * 1.35;
  return (
    <motion.img 
      src={bookImage} 
      alt="Cosmic Learning Book"
      width={s}
      height={s}
      className={className}
      style={{ 
        width: s, 
        height: s,
        objectFit: 'contain'
      }}
    />
  );
};

export default Book3DIcon;