import { motion } from "motion/react";
import { Star, MapPin, Users, Building2, Calendar } from "lucide-react";
import { Company } from "@/types/company.type";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface FeaturedCompaniesProps {
  companies: Company[];
}

export function FeaturedCompanies({ companies }: FeaturedCompaniesProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography
            variant="h3"
            component="h3"
            className="mb-2 text-xl font-bold"
          >
            Công ty nổi bật
          </Typography>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá các công ty hàng đầu đang tìm kiếm tài năng như bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm hover:border-primary/20 relative overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-6 relative">
                  {/* Company Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="relative"
                    >
                      <Avatar
                        src={company.logo}
                        alt={company.name}
                        className="object-cover w-16 h-16 border-2 border-background shadow-md"
                      >
                        {company.name.slice(0, 2)}
                      </Avatar>
                      {company.rating >= 4.5 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-200 truncate">
                        {company.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {company.industry}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{company.rating}</span>
                          <span className="text-muted-foreground text-sm">
                            ({company.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                    {company.description}
                  </p>

                  {/* Company Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{company.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{company.size}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>Founded {company.founded}</span>
                    </div>
                  </div>

                  {/* Company Stats/Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      color="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {company.industry}
                    </Badge>
                    {company.rating >= 4.5 && (
                      <Badge
                        color="secondary"
                        className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      >
                        Top Rated
                      </Badge>
                    )}
                    {company.reviewCount > 200 && (
                      <Badge
                        color="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outlined"
                        color="warning" // ✅ viền + text cam/vàng
                        className="w-full transition-all duration-200"
                      >
                        <Building2 className="w-4 h-4 mr-2" />
                        Xem việc làm
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
