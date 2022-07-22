import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface IBackButton {
  to: string;
}

export const BackButton = ({ to }: IBackButton) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Button variant="text" sx={{ fontWeight: 'bold' }}>
      <ArrowBackIosIcon /> Go back
    </Button>
  </Link>
);
