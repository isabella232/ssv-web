import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// import LastPageIcon from '@material-ui/icons/LastPage';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useStyles } from '~app/common/components/DataTable/components/PaginationActions/PaginationAction.styles';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    // eslint-disable-next-line no-unused-vars
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const PaginationActions = (props: TablePaginationActionsProps) => {
    const { count, page, rowsPerPage, onChangePage } = props;
    const theme = useTheme();
    const classes = useStyles();
    const startAt = rowsPerPage * page + 1;
    const endAt = startAt + rowsPerPage - 1 > count ? count : startAt + rowsPerPage - 1;

    // const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     onChangePage(event, 0);
    // };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    // const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    // };

    return (
      <Grid container className={classes.Root}>
        <Grid item>
          <p className={classes.PageRangeText}>{startAt} - {endAt} of {count}</p>
        </Grid>
        {/* <Grid item> */}
        {/*  <p>Rows per page:</p> */}
        {/*  <Grid> */}
        {/*    s */}
        {/*  </Grid> */}
        {/* </Grid> */}
        <Grid item>
          {/* <IconButton */}
          {/*  onClick={handleFirstPageButtonClick} */}
          {/*  disabled={page === 0} */}
          {/*  aria-label="first page" */}
          {/* > */}
          {/*  {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />} */}
          {/* </IconButton> */}
          <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
              >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          {/* <IconButton */}
          {/*  onClick={handleLastPageButtonClick} */}
          {/*  disabled={page >= Math.ceil(count / rowsPerPage) - 1} */}
          {/*  aria-label="last page" */}
          {/* > */}
          {/*  {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />} */}
          {/* </IconButton> */}
        </Grid>
      </Grid>
    );
};

export default PaginationActions;
