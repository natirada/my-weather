import React, {Component} from 'react';
// import axios from '../../axios-weather';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: false,
            message: ''
        }

        componentWillMount () {
           this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: false});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: true, message: error.message});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        onSetShow = () => {
            this.setState({error: false});
        }
        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        setShow={this.onSetShow}
                        errorMessage={this.state.message}>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;