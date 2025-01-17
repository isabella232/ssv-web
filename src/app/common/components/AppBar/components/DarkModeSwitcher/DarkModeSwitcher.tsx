import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useStores } from '~app/hooks/useStores';
import ApplicationStore from '~app/common/stores/Application.store';
import { useStyles } from './DarkModeSwitcher.styles';

type Props = {
    margin?: boolean,
};

const DarkModeSwitcher = (props: Props) => {
    const stores = useStores();
    const { margin } = props;
    const applicationStore: ApplicationStore = stores.Application;
    const classes = useStyles({ isDarkMode: applicationStore.darkMode, margin });

    return (
      <Grid container onClick={() => { applicationStore.switchDarkMode(!applicationStore.darkMode); }}>
        <Grid item className={classes.Image} />
      </Grid>
    );
};

export default observer(DarkModeSwitcher);
