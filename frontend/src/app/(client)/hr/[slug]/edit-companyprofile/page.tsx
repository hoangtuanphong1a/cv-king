"use client"; 
import {
Box,
    Button,
    CircularProgress,
    Stack,
    Typography,

} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ProfilePhoto from "@/components/ui/client/hr/company/ProfilePhoto";
import CompanyInformation from "@/components/ui/client/hr/company/CompanyInformation";
import ContactInformation from "@/components/ui/client/hr/company/ContactInformation";
import CompanyBenifits from "@/components/ui/client/hr/company/CompanyBenifits";
import { useParams, useRouter } from "next/navigation";
import { useEmployerProfilesQuery, useUpdateEmployerAndCompanyMutation } from "@/api/employer-profile/query";
import { useCompanyByIdQuery } from "@/api/Company/query";
import { useQueryClient } from "@tanstack/react-query";

export default function EditCompanyProfile() {
    const queryClient = useQueryClient();
    const { slug } = useParams();
    const router = useRouter();
    const { mutateAsync: updateEmployerAndCompany } = useUpdateEmployerAndCompanyMutation();

    const [companyInfo, setCompanyInfo] = useState({
        name: "",
        industry: "",
        size: "",
        description: "",
        benefits: [] as string[],
    });
    const [contactInfo, setContactInfo] = useState({
        contactName: "",
        phone: "",
        website: "",
        address: "",
    });
    //get employer
    const{ data: employerProfiles, isLoading: loadingProfile} = useEmployerProfilesQuery()
    const employerProfile = employerProfiles?.items?.[0];

    //get company
    const companyId = employerProfile?.company ?? "";
    const { data: companyData, isLoading: loadingCompany} =
        useCompanyByIdQuery(companyId, { enabled: Boolean(companyId) });
    
    useEffect(() => {
        if (employerProfile && companyData) {
            setCompanyInfo({
                name: companyData.name ?? "",
                industry: companyData.industry ?? "",
                size: companyData.companySize ?? "",
                description: companyData.description ?? "",
                benefits: companyData.benefits ?? [],
            });

            setContactInfo({
                contactName: employerProfile.title ?? "",
                phone: employerProfile.phone ?? "",
                website: companyData.website ?? "",
                address: companyData.location ?? "",
            });
        }
    }, [employerProfile, companyData]);

    // --- Lưu dữ liệu ---
    const handleSave = async () => {
        if (!employerProfile || !companyId) return;
        try {
            await updateEmployerAndCompany({
                id: employerProfile.id,
                data: {
                    employerProfile: {
                        title: contactInfo.contactName,
                        phone: contactInfo.phone,
                    },
                    company: {
                        name: companyInfo.name,
                        industry: companyInfo.industry,
                        companySize: companyInfo.size,
                        description: companyInfo.description,
                        website: contactInfo.website,
                        location: contactInfo.address,
                        benefits: companyInfo.benefits,
                    },
                },
            });
            queryClient.invalidateQueries({ queryKey: ["employer-profiles"] });
            queryClient.invalidateQueries({ queryKey: ["company", companyId] });

            alert("Cập nhật thành công!");
            router.push("/hr");
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại!");
        }
    };

    if (loadingProfile || loadingCompany) {
        return (
        <Box className="flex justify-center py-16">
            <CircularProgress />
        </Box>
        );
    }


            return (
                <Box p={3}>
                    {/* Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Button startIcon={<ArrowBack />} onClick={() => router.back()}>
                            Back to Dashboard
                        </Button>
                        <Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: "#ddd",
                                    color: "#000",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderRadius: "6px",
                                    px: 3,
                                    py: 1,
                                    mr: 1,
                                    "&:hover": {
                                        borderColor: "#bbb",
                                        backgroundColor: "#f9f9f9",
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Save />}
                                onClick={handleSave}
                                sx={{
                                    backgroundColor: "#F15A29",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderRadius: "6px",
                                    px: 3,
                                    py: 1,
                                    "&:hover": {
                                        backgroundColor: "#d94e22",
                                    },
                                }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Edit Company Profile:{slug}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Update your company information
                    </Typography>
                    <Stack spacing={3}>
                        <ProfilePhoto />
                        <CompanyInformation form={companyInfo} setForm={setCompanyInfo} />
                        <ContactInformation form={contactInfo} setForm={setContactInfo} />
                        <CompanyBenifits
                            benefits={companyInfo.benefits}
                            setBenefits={(newBenefits) =>
                                setCompanyInfo((prev) => ({...prev, benefits: newBenefits}))
                             } />
                    </Stack>
                </Box>
            );
        }