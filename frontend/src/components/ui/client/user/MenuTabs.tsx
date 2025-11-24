"use client";
import { Link } from "lucide-react";
import React ,{useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CompaniesSection from "../home/CompaniesSection";
import InforUser from "./InforUser";
import { useForm } from 'react-hook-form';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const MenuTabs = () => {
 const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
     const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
    });
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };
    const handleSave = (updatedData: z.infer<typeof formSchemaPersonal>) => {
        setFormData((prevData) => ({ ...prevData, ...updatedData }));
        setIsEditing(false);
    };
     // Danh sách các tab
  const tabList = [
    { label: 'Việc làm', content:<></> },
    { label: 'Quản lí CV & Cover letter', content: 'Nội dung cho tab Quản lí CV & Cover letter' },
    { label: 'Hồ sơ cá nhân', content: <InforUser  isEditing={isEditing}
                data={formData}
                onSave={handleSave}/> },
    { label: 'Đăng xuất', content: 'Nội dung cho tab Đăng Xuất' },
  ];
  return (
    <Box sx={{ display: 'flex', height: 'auto', bgcolor: '#f5f5f5' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '200px', bgcolor: 'tan', height : '250px', marginLeft: '4rem', marginTop: '3rem' }}
      >
        {tabList.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            {...a11yProps(index)}
            sx={{  bgcolor: value === index ? '#fff3e0' : 'transparent' }}
          />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {tabList.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <Box>
              <p>{tab.content}</p>
            </Box>
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );};
export default MenuTabs;
