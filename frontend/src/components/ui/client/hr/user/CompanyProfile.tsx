"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useApp } from "@/components/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
} from "@mui/material";
import { CheckCircle, Edit } from "lucide-react";
import EditCompanyProfile from "@/app/(client)/hr/[slug]/edit-companyprofile/page";
import { useEmployerProfilesQuery } from "@/api/employer-profile/query";
import { useCompaniesQuery, useCompanyByIdQuery } from "@/api/Company/query";
import { useRouter } from "next/navigation";
import slugify from "slugify";

type CompanyProfileProps = {
  onEdit: () => void;
};

const CompanyProfile = ({ onEdit }: CompanyProfileProps) => {
  const { navigateTo } = useApp();
  const router = useRouter();
  const {
    data: employerProfiles,
    isLoading: loadingProfiles,
    isError: err,
  } = useEmployerProfilesQuery();
  const employerProfile = employerProfiles?.items?.[0];
  const companyId = employerProfile?.company ?? "";
  const {
    data: company,
    isLoading: loadingCompany,
    isError: errorCompany,
  } = useCompanyByIdQuery(companyId, { enabled: Boolean(companyId) });
  console.log("CompanyId:", companyId);
  console.log("Company data:", company);
  console.log("Loading company:", loadingCompany);
  console.log("Error company:", errorCompany);
  if (loadingProfiles || loadingCompany)
    return <Typography>Đang tải thông tin công ty...</Typography>;
  if (err || !employerProfile)
    return <Typography>Không tìm thấy hồ sơ Employer</Typography>;
  if (errorCompany || !company)
    return <Typography>Không tìm thấy công ty</Typography>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mt-[5px]">
        <Typography variant="h5">Thông tin công ty</Typography>
        <Button
          variant="contained"
          onClick={() => {
            const slug = slugify(company.name, { lower: true, strict: true });
            router.push(`/hr/${slug}/edit-companyprofile`);
          }}
          startIcon={<Edit className="w-4 h-4" />}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Edit
        </Button>
      </div>

      {/* Company Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              {company.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <Typography variant="h6">{company.name}</Typography>
              <Typography color="text.secondary" className="mb-4">
                {company.description}
              </Typography>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Typography variant="subtitle1" className="mb-3">
                    Thông tin công ty
                  </Typography>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Ngành:</span>{" "}
                      {company.industry}
                    </p>
                    <p>
                      <span className="font-medium">Quy mô:</span>{" "}
                      {company.companySize}
                    </p>
                    {/* <p>
                                            <span className="font-medium">Thành lập:</span> 2015
                                        </p> */}
                    <p>
                      <span className="font-medium">Website:</span>
                      <Button variant="text" color="primary" size="small">
                        {company.website}
                      </Button>
                    </p>
                  </div>
                </div>

                <div>
                  <Typography variant="subtitle1" className="mb-3">
                    Thông tin liên hệ
                  </Typography>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Địa chỉ:</span>{" "}
                      {company.location}
                    </p>
                    <p>
                      <span className="font-medium">Số điện thoại:</span>
                      <Button variant="text" color="primary" size="small">
                        {employerProfile.phone}
                      </Button>
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>
                      <Button variant="text" color="primary" size="small">
                        {employerProfile.title}
                      </Button>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant="subtitle1" className="mb-3">
                  Về chúng tôi
                </Typography>
                <Typography color="text.secondary">
                  {company.description}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Card */}
      <Card>
        <CardHeader
          title={<Typography variant="h6">Lợi ích của công ty</Typography>}
        />
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {(Array.isArray(company.benefits) ? company.benefits : (company.benefits ? [company.benefits] : [])).map((benefit, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <Typography variant="body2">{benefit}</Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
