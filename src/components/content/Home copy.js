import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';

import { fetchCityDetails, fetchSelectedCity, fetchToggleFavorites } from '../../actions';
import { GetCitiesOptions, GetCityFromLocation } from '../../apis/weatherApi';
import ErrorModal from '../ErrorModal';
import '../styles.css';

const AsyncTypeahead = asyncContainer(Typeahead);

class Home extends React.Component {
    state = { isLoading: false, options: null };

    // componentDidMount() {
    //     const { selectedCity, fetchSelectedCity } = this.props;
        
    //     if(!selectedCity) {
    //         if (!navigator.geolocation) {
    //             fetchSelectedCity({ cityName: 'Tel Aviv', cityId: '215854'});
    //         }
    //         else {
    //             navigator.geolocation.getCurrentPosition((success, error) => {
    //                 if(!error) {
    //                     const { longitude, latitude } = success.coords;

    //                     this.getLocation(`${latitude},${longitude}`);
    //                 }
    //             });
    //         }
    //     }
    // }

    // componentDidUpdate() {
    //     const { selectedCity, citiesDetails } = this.props;

    //     if(!citiesDetails || selectedCity.cityName !== citiesDetails.cityName) {
    //         this.props.fetchCityDetails(selectedCity);
    //     }
    // }

    getLocation = async query => {
        const localCity = await GetCityFromLocation(query);
        
        this.props.fetchSelectedCity(localCity);
    };

    onSearch = async query => {
        if(query) {
            this.setState({
                isLoading: false,
                options: await GetCitiesOptions(query)
            });
        }
    }

    onChange = city => {
        if(city) {
            this.props.fetchSelectedCity(city);
        }
    };

    render(){
        const { citiesDetails, nightMode } = this.props;
        const { isLoading, options } = this.state;

        if(true) {
            if(false) {
                return (
                    <div>
                        Failure
                        <ErrorModal errors={citiesDetails.error}/>
                    </div>
                );
            }
            return (
                <div className={`page-dark page`}>
                    <Container>
                        <Row className="pt-3">
                            <Col lg={2}>
                                <Form.Check 
                                    type="switch"
                                    id="night-mode"
                                    label="Night mode"
                                    onChange={() => this.setState({ nightMode: !nightMode })}
                                />
                            </Col>
                            <Col>
                                <Form.Check 
                                    type="switch"
                                    id="temperature-mode"
                                    label="Celsius/Fahrenheit"
                                    onChange={() => this.setState({ nightMode: !nightMode })}
                                />
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row className="justify-content-center m-5">
                            <Col className="d-none d-sm-block" md='auto'>
                                <i className='fa search fa-search search-'></i>
                            </Col>
                            {/* <Col lg={4} xs={12}>
                                <AsyncTypeahead
                                    id='input-city'
                                    isLoading={isLoading}
                                    onSearch={this.onSearch}
                                    options={options ? Object.keys(options) : []}
                                    onChange={cities => this.onChange(options[cities[0]])} // cities is an array of single selected city
                                />
                            </Col> */}
                        </Row>
                    </Container>
                    <Container id="weather-details" className={`bordered content-dark pt-5`}>
                        <Row>
                            <Col className="d-none d-sm-block" lg={2}><img width={100} height={70} src={'https://developer.accuweather.com/sites/default/files/07-s.png'} alt="weather-icon"></img></Col>
                            <Col md={{span: 6}} sm={12} className="pt-4">
                                <h4>Tel Aviv</h4>
                                <h4>52<span>&#176;</span>c</h4>
                            </Col>
                            <Col lg={3}><Button id="favorite-btn" variant="dark" onClick={() => this.props.fetchToggleFavorites(citiesDetails)}>{`Add to Favorites`}</Button></Col>
                            <Col>
                                <i md='auto' className={`heart fa fa-heart`} ></i>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col className="p-2" md="auto"><h1>This is why Im hot hot</h1></Col>
                        </Row>
                        <Row className="p-5 ml-5">
                            {
                                [
                                    { dayOfWeek: 'Sun', temperature: 55 },
                                    { dayOfWeek: 'Sun', temperature: 55 },
                                    { dayOfWeek: 'Sun', temperature: 55 },
                                    { dayOfWeek: 'Sun', temperature: 55 },
                                    { dayOfWeek: 'Sun', temperature: 55 }
                                ].map(({ dayOfWeek, temperature }) => {
                                    return (
                                        <Col key={dayOfWeek} md="auto" className="card-dark bordered p-5 mr-5">
                                            <h5>{dayOfWeek}</h5>
                                            <h5>{temperature}<span>&#176;</span>c</h5>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Container> 
                </div>
            );
        }
        return (
            <div>
                Loading...
            </div>
        );
    }
}

const mapStateToProps = ({ citiesDetails, selectedCity }) => {
    return {
        citiesDetails, 
        selectedCity
    }
}