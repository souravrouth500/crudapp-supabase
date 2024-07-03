import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Interface } from 'readline';
import Link from 'next/link';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ data, style }: any) {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <>
            {
                data.map((item: any, index: number) => {
                    return (
                        <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)} key={index}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>{item.parent}</Typography>
                            </AccordionSummary>
                            {
                                item.child.map((item: string[], index: number) => {
                                    return (
                                        <Link href={`/${item.toString().toLowerCase() === 'list' ? '' : item}`} style={{ textDecoration: 'none', color: 'black', textTransform: 'capitalize', }}>
                                            <AccordionDetails sx={{ my: 0.5, py: 1, pl: '50px', bgcolor: '#29272747', borderRadius: '4px', '&:hover': { bgcolor: 'black' } }} key={index}>
                                                <Typography sx={{ color: 'black', '&:hover': { color: 'green', } }}>
                                                    {item}
                                                </Typography>
                                            </AccordionDetails>
                                        </Link>
                                    )
                                })
                            }
                        </Accordion>
                    )
                })
            }
        </>
    );
}
