import React from 'react';
import { useBreadcrumb } from '@/context/BreadcumbContext'; 
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { ChevronRight } from 'lucide-react';


const BreadcrumbDisplay = () => {
  const { currentPath } = useBreadcrumb();

  return (
    <Breadcrumbs
      separator={<ChevronRight fontSize="small" className="text-gray-500" />}
      aria-label="breadcrumb"
      className="mb-8 text-xs text-gray-500"
    >
      {currentPath.map((item, index) => (
        <Typography
          key={index}
          className={`text-xs ${
            index === currentPath.length - 1
              ? 'text-gray-700 font-medium'
              : 'text-gray-500'
          }`}
        >
          {item.name}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbDisplay;