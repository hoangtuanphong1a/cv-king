"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";

// Styled components tương ứng với shadcn/ui classes
const StyledAvatarRoot = styled('span')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  width: '5rem', 
  height: '5rem',
  flexShrink: 0,
  overflow: 'hidden',
  borderRadius: '50%',
}));

const StyledAvatarImage = styled('img')({
  aspectRatio: '1 / 1',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledAvatarFallback = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.grey[600],
}));

// Context để chia sẻ state
const AvatarContext = React.createContext<{
  imageLoaded: boolean;
  imageError: boolean;
  setImageLoaded: (loaded: boolean) => void;
  setImageError: (error: boolean) => void;
}>({
  imageLoaded: false,
  imageError: false,
  setImageLoaded: () => {},
  setImageError: () => {},
});

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

function Avatar({ className, ...props }: AvatarProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <AvatarContext.Provider value={{ imageLoaded, imageError, setImageLoaded, setImageError }}>
      <StyledAvatarRoot
        data-slot="avatar"
        className={className}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  const { setImageLoaded, setImageError } = React.useContext(AvatarContext);

  const handleLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  return (
    <StyledAvatarImage
      data-slot="avatar-image"
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  const { imageLoaded, imageError } = React.useContext(AvatarContext);

  // Chỉ hiển thị fallback khi image chưa load hoặc có lỗi
  if (imageLoaded && !imageError) {
    return null;
  }

  return (
    <StyledAvatarFallback
      data-slot="avatar-fallback"
      className={className}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
