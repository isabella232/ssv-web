import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Header: {
        fontSize: 20,
        lineHeight: 1.4,
        fontWeight: 'bold',
        color: theme.colors.gray90,
        marginBottom: theme.spacing(5),
    },
    SubHeader: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray80,
        marginBottom: theme.spacing(5),
    },
}));
