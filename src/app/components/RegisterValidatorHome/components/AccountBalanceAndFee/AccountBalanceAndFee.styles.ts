import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    bodyTextWrapper: {
        marginBottom: theme.spacing(5),
    },
    bodyText: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray80,
        marginBottom: theme.spacing(3),
    },
    ErrorTextWrapper: {
        height: 93,
        borderRadius: 2,
        padding: theme.spacing(3, 4),
        marginBottom: theme.spacing(5),
        background: 'rgb(236, 28, 38, 0.08);',
        border: `solid 1px ${theme.colors.primaryError}`,
        backgroundColor: theme.colors.primaryErrorRegular,

    },
    ErrorText: {
        // height: '60px',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: 1.43,
        color: '#ec1c26',
    },
}));
