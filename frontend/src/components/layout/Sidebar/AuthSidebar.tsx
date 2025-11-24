"use client";
import { ROUTES } from "@/lib/routes";
import { Box } from "@mui/material";
import ImageSB from "@/assets/images/SB-TD.png";
import ImageSB1 from "@/assets/images/SB-TD1.png";
import ImageSidebar from "@/assets/images/SB.png";
import ImageSidebar1 from "@/assets/images/SB.png";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AuthSidebar = () => {
  const [isXlScreen, setIsXlScreen] = useState(false);
  const pathname = usePathname();
  const isRegisterCompany = pathname.startsWith(ROUTES.REGISTER_COMPANY);

  useEffect(() => {
    const handleResize = () => {
      setIsXlScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className="col-span-12 lg:col-span-4 relative h-[40vh] md:h-[50vh] lg:h-screen w-full"
      style={{
        backgroundImage: `url(${
          isRegisterCompany
            ? isXlScreen
              ? ImageSB.src
              : ImageSB1.src
            : isXlScreen
            ? ImageSidebar.src
            : ImageSidebar1.src
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full text-white px-4">
        <Box className="text-center xl:text-left">
          <h2 className="inline-block mx-auto text-3xl xl:text-5xl bg-white text-orange-400 font-bold mb-6 border rounded-full p-4">
            CVKING
          </h2>
        </Box>
        <p className=" text-center xl:text-left text-xl w-[90%]">
          Nơi CV gặp đúng nhà tuyển dụng và kết nối bạn với công việc mơ ước.
        </p>
      </Box>
    </aside>
  );
};
export default AuthSidebar;
