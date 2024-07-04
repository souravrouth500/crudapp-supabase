import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '@/styles/Accordion.module.css';

<style jsx>
    {`
    a.active, .active {
    color: "red";
    }
    `}
</style>
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
    
    const [active, setActive] = React.useState<any>("")
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
                                <Typography sx={{color: '#00A76F'}}>{item.parent.toLowerCase() === 'user' &&<AccountBoxIcon style={{verticalAlign: 'middle', marginRight: '5px'}}/> || item.parent.toLowerCase() === 'product' && <ShoppingBagIcon style={{verticalAlign: 'middle', marginRight: '5px'}}/> || item.parent.toLowerCase() === 'order' && <ShoppingCartIcon style={{verticalAlign: 'middle', marginRight: '5px'}}/>}{item.parent}</Typography>
                            </AccordionSummary>
                            {
                                item.child.map((item: string[], index: number) => {
                                    return (
                                        <AccordionDetails sx={{ my: 0.5, py: 1, pl: '50px', bgcolor: '', borderRadius: '4px', '&:hover': { bgcolor: 'rgba(145 158 171 / 0.08)' } }} >
                                            <Link href={`/${item.toString().toLowerCase() === 'list' ? '' : item}`} style={{ textDecoration: 'none', color: 'black', textTransform: 'capitalize', }} key={index} onClick={() => setActive(item)} className={`${active === item && 'active'}`}>
                                            {item}
                                                {/* <Typography sx={{ color: 'black', '&:hover': { color: 'green', } }}>
                                                    
                                                </Typography> */}
                                            </Link>
                                        </AccordionDetails>
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
