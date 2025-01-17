import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    ButtonWrapper: {
        marginRight: theme.spacing(6),
    },

    button: {
        color: '#FFFFFF',
        cursor: 'pointer',
        height: '48px',
        background: '#5B6C84',
        borderRadius: '6px',
        width: '100%',
        textTransform: 'capitalize',
        '&:hover': {
            background: '#2a323e',
        },
    },
    ApprovalButton: {
        width: 280,
        height: 60,
        borderRadius: 8,
        lineHeight: 1.25,
        cursor: 'pointer',
        textAlign: 'center',
        color: theme.colors.white,
        padding: '20px 92px 20px 90px',
        backgroundColor: theme.colors.primaryBlue,
        '&:nth-child(1)': {
            marginRight: theme.spacing(6),
        },
    },
    ProgressStepsWrapper: {
        alignItems: 'center',
        padding: theme.spacing(4, 30, 0, 30),
    },
    StepText: {
        width: 10,
        height: 22,
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'center',
        color: theme.colors.gray60,
        // margin: 'auto',
        // width: '9px',
        // paddingTop: '2px',
        // height: '100%',
        // fontSize: '12px',
        // fontWeight: 'bold',
        // lineHeight: 1.5,
        // textAlign: 'center',
        // color: '#a1acbe',
    },
    Line: {
        height: 1,
        width: 272,
        margin: '15.5px 0',
        backgroundColor: theme.colors.gray40,
    },
    Step: {
        width: 32,
        height: 32,
        borderRadius: 50,
        textAlign: 'center',
        padding: '3px 10px',
        backgroundColor: theme.colors.gray10,
        border: `solid 1px ${theme.colors.gray30}`,
    },
    Current: {
        color: theme.colors.black,
        backgroundColor: theme.colors.primarySuccessRegularOpacity,
        border: `solid 1px ${theme.colors.primarySuccessDark}`,
    },
    Finish: {
        border: 'none',
        backgroundSize: 'contain',
        backgroundColor: '#20eec8',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/step-done.svg)',
    },
}));
