import React from "react";
import NextLink from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChevronRight, HomeIcon } from "lucide-react";

type BreadcrumbItemType = {
  name: string;
  link?: string;
};


type Props = {
  items: BreadcrumbItemType[];
};


const BreadcrumbTabActive: React.FC<Props> = ({items}) => {

  return (
    <Breadcrumbs
      separator={<ChevronRight fontSize="small" className="text-gray-500 font-light size-5" />}
      aria-label="breadcrumb"
      className="mb-8 text-xs text-gray-500"
    >
      <Link
        component={NextLink}
        href="/"
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <HomeIcon className="h-4 w-4 mr-1 text-gray-400 hover:text-orange-400" /> 
        
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center">
            {isLast ? (
              <Typography className="text-xs text-black dark:text-white font-medium">
                {item.name}
              </Typography>
            ) : (
              <Link
                component={NextLink}
                href={item.link|| "#"}
                className="text-xs no-underline"
              >
                <span className="h-4 w-4  text-gray-400 hover:text-orange-400">{item.name}</span>
              </Link>
            )}
          </div>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbTabActive;
