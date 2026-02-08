import { motion } from "motion/react";
import bookImage from "figma:asset/6fdd90e994be276ebad53420f00ef1757e0c6356.png";

/**
 * 📚 3D КОСМИЧЕСКАЯ КНИГА
 * 
 * Заменена на красивое 3D изображение книги с галактическим порталом
 */

interface IconProps {
  size?: number;
  className?: string;
}

export const Book3DIcon = ({ size = 120, className = "" }: IconProps) => (
  <motion.img 
    src={bookImage} 
    alt="Cosmic Learning Book"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size, 
      height: size,
      objectFit: 'contain'
    }}
  />
);

export default Book3DIcon;