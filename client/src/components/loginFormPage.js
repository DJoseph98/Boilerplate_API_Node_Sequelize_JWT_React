import React from 'react';
import { connect } from 'react-redux';
import { startCreateNewUserByEmail, startLoginByEmail } from '../actions/auth';

class LoginFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            error: undefined,
            value: 0,
            userExist: props.userExist
        };
    }
    submitForm = (e) => {
        e.preventDefault();
        const passwordChecker = e.target.password_confirm ? e.target.password_confirm.value : undefined;
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        };

        if (passwordChecker === undefined) {
            this.props.startLoginByEmail(data).then().catch((e) => {
                this.setState({ error: e.message })
            });
        } else if (passwordChecker !== undefined) {
            if (e.target.password_confirm.value === e.target.password.value) {
                this.props.startCreateNewUserByEmail(data).then().catch((e) => {
                    this.setState({ error: e.message })
                });
            } else {
                this.setState({ error: "It must be the same password" })
            }
        }
    }
    render() {
        return (
                <form className="form" onSubmit={this.submitForm}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input className="text-input" type="email" name="email" placeholder="Email" required></input>
                    <input className="text-input" type="password" name="password" autoComplete="off" placeholder="Password" required></input>
                    {!this.state.userExist &&
                        <input className="text-input" type="password" name="password_confirm" autoComplete="off" placeholder="Password confirmation" required></input>
                    }
                    <button className="button">
                        {!this.state.userExist ? "Create account" : "Login"}
                    </button>
                </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startCreateNewUserByEmail: (data) => dispatch(startCreateNewUserByEmail(data)),
    startLoginByEmail: (data) => dispatch(startLoginByEmail(data))
});

export default connect(undefined, mapDispatchToProps)(LoginFormPage);