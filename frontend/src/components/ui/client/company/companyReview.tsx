"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { getCompanyReviewByIndex } from "@/faker/companyreview-data";

type CompanyReviewProps = {
    index?: number;
    title?: string;
    content?: string;
    role?: string;
    date?: string;
    rating?: number;
    helpfulCount?: number;
};

export default function CompanyReview({
    index = 0,
    title,
    content,
    role,
    date,
    rating,
    helpfulCount,
}: CompanyReviewProps): React.ReactElement {
    const fallback = getCompanyReviewByIndex(index);
    const finalTitle = title ?? fallback.title;
    const finalContent = content ?? fallback.content;
    const finalRole = role ?? fallback.role;
    const finalDate = date ?? fallback.date;
    const finalRating = rating ?? fallback.rating;
    const finalHelpfulCount = helpfulCount ?? fallback.helpfulCount;
    return (
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5 }}>
            <Stack spacing={1.5}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Rating name="read-only" value={finalRating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">{finalDate}</Typography>
                </Stack>

                <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                    {finalTitle}
                </Typography>

                <Typography variant="body1" color="text.primary" component="div" dangerouslySetInnerHTML={{ __html: finalContent }} />

                <Typography variant="body2" color="text.secondary">{finalRole}</Typography>

                <Box display="flex" justifyContent="flex-end">
                    <Typography variant="body2" color="text.secondary">{finalHelpfulCount} people found this helpful</Typography>
                </Box>
            </Stack>
        </Paper>
    );
}


