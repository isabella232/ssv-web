import { makeStyles } from '@material-ui/core/styles';
import screenSizes from '~lib/utils/screenSizes';

export const useStyles = makeStyles((theme) => ({
    BorderScreenWrapper: {
        width: 648,
        margin: 'auto',
        [screenSizes.xs]: {
            width: '100%',
        },
        [screenSizes.md]: {
            width: 452,
        },
        [screenSizes.lg]: {
            width: 648,
        },
    },
    LinkWrapper: {
        height: 20,
        minWidth: 17,
        marginBottom: theme.spacing(2),
    },
    ScreenWrapper: {
        borderRadius: 16,
        backgroundColor: theme.colors.squareScreenBackground,
        [screenSizes.xs]: {
            borderRadius: 0,
        },
    },
    Section: {
        height: 'fit-content',
        padding: theme.spacing(8),
        borderBottom: `solid 1px ${theme.colors.gray20}`,
        '&:nth-child(2)': {
            padding: theme.spacing(5, 8, 8, 8),
        },
    },
    HeaderSection: {
        padding: theme.spacing(8, 8, 0, 8),
        height: 'fit-content',
    },
    Header: {
        fontSize: 20,
        lineHeight: 1.4,
        fontWeight: 'bold',
        color: theme.colors.gray40,
    },
    BlackHeader: {
        color: theme.colors.gray90,
    },
    Conversion: {
        width: 88,
        height: 28,
        padding: 2,
        float: 'right',
        borderRadius: 8,
        border: `solid 1px ${theme.colors.gray20}`,
        backgroundColor: theme.colors.gray10,
    },
    Currency: {
        width: 40,
        height: 22,
        fontSize: 12,
        borderRadius: 5,
        fontWeight: 500,
        cursor: 'pointer',
        padding: '2px 8px 1px 9px',
        color: theme.colors.gray40,
    },
    SelectedCurrency: {
        backgroundColor: theme.colors.gray60,
        color: theme.colors.gray10,
    },
}));
