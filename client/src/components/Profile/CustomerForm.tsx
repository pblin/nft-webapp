import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Box, Button, Grid, Link, TextField} from "@material-ui/core";
import {ReduxFormValidator} from "../Common/Error/ReduxFormValidator";;
import {ERROR_TYPE} from "../Common/Error/ErrorType";
import {connect} from "react-redux";
import {emailSelector, profileSelector} from "../../store/profile/profileSelector";

interface CustomerFormProps {
   onSubmit: any;
   initialValues: any;
  //pristine: boolean;
  //invalid: boolean;
}

const renderTextField = ({input, label, meta, custom}) => {
  let helperText = meta.error != undefined && meta.touched ? meta.error: custom.helperText;

  return (
    <Grid item xs={custom.gridXs} sm={custom.gridSm}>
      <TextField
        className="basic-form-input"
        margin="normal"
        variant={'outlined'}
        label={label}
        disabled={custom.disabled || false}
        error={meta.touched && meta.error != undefined}
        {...input}
        type={custom.type || 'text'}
        fullWidth
        helperText={helperText}
      />
  </Grid>
)
};


const AnchorLink = ({href, label, title, custom}) => {
  return (
    <Grid 
      item 
      xs={custom.gridXs} 
      sm={custom.gridSm}
      md={custom.gridMd}
    >
      <Link 
        href={href} 
        underline="hover"
        title={title}
      >
        <Button 
          variant="text"
        >
          {label}
        </Button>
      </Link>
      <Box sx={{ mb: 4 }} />
  </Grid>)
};

const reduxFormValidator = new ReduxFormValidator();

const validate = (values) => {
  let errors = reduxFormValidator.validate(values, [
    {
      fieldName: 'firstName',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'First Name is required'
      ]
    },
    {
      fieldName: 'lastName',
      errors: [
        {type: ERROR_TYPE.REQUIRED}
      ],
      errorMessages: [
        'Last Name is required'
      ]
    },
  ]);

  return errors;
};

class CustomerForm extends Component<CustomerFormProps> {
  render() {

    const {
      walletAddress1,
      walletAddress2,
      walletURLPrefix
    } = this.props.initialValues || {};

    return (
      <form onSubmit={this.props.onSubmit}>
      <Grid spacing={4} container={true} >
        <Field
          label="First Name"
          component={renderTextField}
          name="firstName"
          type="text"
          custom={ {helperText: "First Name", gridXs: 12, gridSm: 6} }
        />
        <Field
          label="Last Name"
          component={renderTextField}
          name="lastName"
          type="text"
          custom={ {helperText: "Last Name", gridXs: 12, gridSm: 6} }
        />
        <Field
          label="Primary Email"
          component={renderTextField}
          name="primaryEmail"
          type="text"
          custom={ {helperText: "Last Name", gridXs: 12, gridSm: 4, disabled: true} }
        />
        <Field
          label="Secondary Email"
          component={renderTextField}
          name="secondaryEmail"
          type="text"
          custom={ {helperText: "Secondary Email", gridXs: 12, gridSm: 4} }
        />
        <Field
          label="Phone"
          component={renderTextField}
          name="phone"
          type="text"
          custom={ {helperText: "Phone", gridXs: 12, gridSm: 4} }
        />
        <Field
          label="Full Address"
          component={renderTextField}
          name="address"
          type="text"
          custom={ {helperText: "Address", gridXs: 12, gridSm: 12} }
        />
        {walletAddress1 && <AnchorLink
          custom={{gridXs: 12, gridSm: 8, gridMd: 6}}
          href={walletURLPrefix + walletAddress1}
          title='Wallet Address 1'
          label={walletAddress1}
        />}
        {walletAddress2 && <AnchorLink
          custom={{gridXs: 12, gridSm: 8, gridMd: 6}}
          href={walletURLPrefix + walletAddress2}
          title='Wallet Address 2'
          label={walletAddress2}
        />}
      </Grid>
    </form>
  );
  }
}

function mapStateToProps(state) {
    let profile = profileSelector(state);
    let email = emailSelector(state);

    if(!profile) {
      return {};
    }

    return {
      initialValues: {
        firstName: profile['first_name'],
        lastName: profile['last_name'],
        primaryEmail: profile['primary_email'] || email,
        secondaryEmail: profile['secondary_email'],
        phone: profile['phone'],
        address: profile['address'],
        walletAddress1: profile['wallet_address_1'],
        walletAddress2: profile['wallet_address_2'],
        walletURLPrefix: 'https://rinkeby.etherscan.io/address/' 
      }
    }
}

//@ts-ignore
CustomerForm = reduxForm({form: 'profile', validate, destroyOnUnmount: false})(CustomerForm);
export default connect(mapStateToProps)(CustomerForm);
