"use client";
// import { Card, CardContent, CardHeader, CardTitle } from '../../common/card/card';
import {
    Edit,
    Eye,
    Calendar,
   Search,
   AlertCircle,
   CheckCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  Avatar,
  Button,
  Typography,
  Chip,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
// import { Avatar , AvatarImage , AvatarFallback} from '../../common/avatar/avatar';
// import { Button } from '../../common/button/button';
import { useApp } from '@/components/AppContext';
import { XCircle } from 'lucide-react';
import { Grid } from '@mui/material';
import { useMyProfileQuery } from '@/api/user/query';
import { useJobApplicationsByJobSeekerQuery } from '@/api/JobApplication/query';
const MyApplication = ()=> {

    const { navigateTo } = useApp();
    
    const { data: userProfile, isLoading: loadingProfile } = useMyProfileQuery();

    const { data: applications = [], isLoading: loadingApplications, error } = useJobApplicationsByJobSeekerQuery(userProfile?.id);
    
    if (loadingProfile || loadingApplications) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
            </Box>
        );
    }

 const handleViewJob = (application: any) => {
    navigateTo("job-detail", { jobId: application.jobId });
  };
 const getStatusChip = (status: string) => {
    const styles: Record<string, any> = {
      Pending: {
        bg: "#FEF3C7",
        color: "#92400E",
        icon: <AlertCircle size={16} color="#92400E" />,
        label: "Pending",
      },
      Interview: {
        bg: "#DBEAFE",
        color: "#1E40AF",
        icon: <Calendar size={16} color="#1E40AF" />,
        label: "Interview",
      },
      Rejected: {
        bg: "#FEE2E2",
        color: "#991B1B",
        icon: <XCircle size={16} color="#991B1B" />,
        label: "Rejected",
      },
      Hired: {
        bg: "#DCFCE7",
        color: "#166534",
        icon: <CheckCircle size={16} color="#166534" />,
        label: "Hired",
      },
    };

    const cfg = styles[status] || {
      bg: "#E5E7EB",
      color: "#374151",
      icon: <AlertCircle size={16} color="#374151" />,
      label: status,
     };
     
     return (
      <Chip
        icon={cfg.icon}
        label={cfg.label}
        sx={{
          backgroundColor: cfg.bg,
          color: cfg.color,
          fontWeight: 500,
          "& .MuiChip-icon": {
            color: cfg.color, // ✅ giúp icon cùng màu text
          },
        }}
      />
    );
    };
    
    if (error) {
    return (
      <Typography color="error" textAlign="center" sx={{ mt: 5 }}>
        Lỗi khi tải dữ liệu: {(error as Error).message}
      </Typography>
    );
  }

    return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          My Applications ({applications.length})
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Search size={18} />}
          onClick={() => navigateTo("jobs")}
        >
          Find More Jobs
        </Button>
      </Stack>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h4" color="primary">
                {applications.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Applications
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h4" sx={{ color: "#CA8A04" }}>
                {applications.filter((a) => a.status === "Pending").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h4" sx={{ color: "#2563EB" }}>
                {applications.filter((a) => a.status === "Interview").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interview
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h4" sx={{ color: "#16A34A" }}>
                {applications.filter((a) => a.status === "Hired").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hired
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Application List */}
      {applications.length === 0 ? (
        <Typography variant="body1" textAlign="center" color="text.secondary" mt={4}>
          You haven't applied for any jobs yet.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {applications.map((application) => (
            <Card key={application.id} elevation={2}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar sx={{ width: 56, height: 56 }}>
                    {application.jobId.charAt(0)}
                  </Avatar>

                  <Box flex={1}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={1}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{
                            cursor: "pointer",
                            "&:hover": { color: "primary.main" },
                          }}
                          onClick={() => handleViewJob(application)}
                        >
                          Job ID: {application.jobId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cover Letter:{" "}
                          {application.coverLetter || "No cover letter provided"}
                        </Typography>
                      </Box>
                      {getStatusChip(application.status)}
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={3}
                      alignItems="center"
                      color="text.secondary"
                      mb={2}
                      sx={{ flexWrap: "wrap" }}
                    >
                      <Box display="flex" alignItems="center">
                        <Calendar size={16} style={{ marginRight: 4 }} />
                        Applied:{" "}
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5} flexWrap="wrap">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Eye size={16} />}
                        onClick={() => handleViewJob(application)}
                      >
                        View Job
                        </Button>
                        {application.status === "Pending" && (
                            <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Edit size={16} />}
                            >
                            Update Application
                            </Button>
                      )}       
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MyApplication;