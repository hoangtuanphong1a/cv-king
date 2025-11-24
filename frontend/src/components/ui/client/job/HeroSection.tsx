import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  Users,
  Building2,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "@/lib/ImageWithFallback";
import {
  Button,
  Card,
  InputAdornment,

  TextField,
} from "@mui/material";

interface HeroSectionProps {
  onSearch: (query: string, location: string) => void;
  totalJobs: number;
  featuredCompanies: Array<{
    name: string;
    logo: string;
    rating: number;
  }>;
}

export function HeroSection({
  onSearch,
  totalJobs,
  featuredCompanies,
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery, location);
  };

  const stats = [
    {
      icon: Briefcase,
      label: "Việc làm đang tuyển",
      value: totalJobs.toLocaleString(),
      color: "text-blue-600",
    },
    {
      icon: Building2,
      label: "Công ty đối tác",
      value: "500+",
      color: "text-green-600",
    },
    {
      icon: Users,
      label: "Ứng viên thành công",
      value: "10,000+",
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      label: "Tỷ lệ thành công",
      value: "95%",
      color: "text-orange-600",
    },
  ];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-6">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MzczNDEzfDA&ixlib=rb-4.1.0&q=80&w=1920"
          alt="Professional workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-background/20" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              y: [-20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Tìm kiếm việc làm
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                mơ ước
              </span>
              <br />
              của bạn
            </motion.h1>

            <motion.p
              className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Khám phá hàng nghìn cơ hội nghề nghiệp từ các công ty hàng đầu.
              Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Card className="p-6 bg-white/95 backdrop-blur-md border-0 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="Tìm kiếm công việc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="Địa điểm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapPin size={16} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  onClick={handleSearch}
                  variant="contained"
                  color="warning"     
                  disableElevation
                  startIcon={<Search size={16} />}
                  sx={{ height: 40 }}
                >
                  Tìm kiếm
                </Button>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center"
          >
            <p className="text-white/80 mb-4">
              Được tin tưởng bởi các công ty hàng đầu
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {featuredCompanies.slice(0, 5).map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30"
                >
                  <div className="flex items-center gap-2">
                    <ImageWithFallback
                      src={company.logo}
                      alt={company.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div className="text-left">
                      <div className="text-white text-sm font-medium">
                        {company.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-white/80 text-xs">
                          {company.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
