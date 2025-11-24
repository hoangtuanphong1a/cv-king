"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CompanyContact from './companyContact';
import CompanyTags from './companyTags';
import CompanyIntro from './companyIntro';
import CompanyJobs from './companyJobs';
import CompanyReview from './companyReview';

export default function CompanyTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '80%', typography: 'body1', margin: '0 auto' }}>
            <TabContext value={value}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ bgcolor: 'grey.100', borderRadius: '9999px', p: 0.5 }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="company tabs"
                            variant="fullWidth"
                            TabIndicatorProps={{ sx: { display: 'none' } }}
                            sx={{
                                minHeight: 44,
                                '& .MuiTab-root': {
                                    minHeight: 40,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    color: '#000',
                                    borderRadius: '9999px',
                                },
                                '& .MuiTab-root.Mui-selected': {
                                    color: '#000',
                                    fontWeight: 700,
                                    bgcolor: '#fff',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
                                }
                            }}
                        >
                            <Tab disableRipple label="Overview" value="1" />
                            <Tab disableRipple label="Jobs (15)" value="2" />
                            <Tab disableRipple label="Reviews (125)" value="3" />
                            <Tab disableRipple label="About" value="4" />
                        </TabList>
                    </Box>
                </Box>
                <TabPanel value="1"><CompanyContact /></TabPanel>
                <TabPanel value="2"><CompanyJobs /></TabPanel>
                <TabPanel value="3"><CompanyReview /></TabPanel>
                <TabPanel value="4"><CompanyIntro /></TabPanel>
            </TabContext>
        </Box>
    );
} 