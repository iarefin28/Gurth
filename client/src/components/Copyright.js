import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {/*<Link color="inherit" href="/">
                Ishan Arefin
    </Link>{' '} */}
            Ishan Arefin. {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}