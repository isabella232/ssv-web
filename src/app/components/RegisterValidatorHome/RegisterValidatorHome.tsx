import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { useStores } from '~app/hooks/useStores';
import config from '~app/common/config';
import ValidatorStore from '~app/common/stores/Validator.store';
import HeaderSubHeader from '~app/common/components/HeaderSubHeader';
import BorderScreen from '~app/components/MyAccount/common/componenets/BorderScreen';
import SecondaryButton from '~app/common/components/SecondaryButton/SecondaryButton';
import { useStyles } from '~app/components/GenerateOperatorKeys/GenerateOperatorKeys.styles';

const RegisterValidatorHome = () => {
  const classes = useStyles();
  const stores = useStores();
  const history = useHistory();
  const validatorStore: ValidatorStore = stores.Validator;

  useEffect(() => {
      validatorStore.clearValidatorData();
  });

  return (
    <BorderScreen
      navigationLink={config.routes.HOME}
      body={[
        <Grid container>
          <HeaderSubHeader title={'Run Validator with the SSV Network'}
            subtitle={'Any validator can run on the SSV network: create a new validator or import you exiting one to begin'}
          />
          <Grid container item justify={'space-evenly'}>
            <Grid container item className={classes.LinkButtonWrapper}>
              <Grid item xs={12}>
                <SecondaryButton text={'Create Validator'} onClick={() => { history.push(config.routes.VALIDATOR.CREATE); }} />
              </Grid>
            </Grid>
            <Grid container item className={classes.LinkButtonWrapper}>
              <Grid item xs={12}>
                <SecondaryButton text={'Import Validator'} onClick={() => { history.push(config.routes.VALIDATOR.IMPORT); }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>,
      ]}
    />
  );
};

export default observer(RegisterValidatorHome);
