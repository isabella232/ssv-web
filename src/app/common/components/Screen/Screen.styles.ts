import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    root: {
        fontFamily: 'Encode Sans',
    },
    align: {
        textAlign: 'center',
    },
    navigation: {
        height: '20px',
        marginTop: '54px',
        '@media (max-width: 480px)': {
            marginTop: '28px',
        },
    },
    header: {
        '@media (max-width: 480px)': {
        },
        marginTop: '23px',
    },
    body: {
        marginTop: '24px',
    },
}));
