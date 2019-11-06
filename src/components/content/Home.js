import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';

import { fetchCityDetails, fetchSelectedCity, fetchToggleFavorites } from '../../actions';
import { GetCitiesOptions, GetCityFromLocation } from '../../apis/weatherApi';
import ErrorModal from '../ErrorModal';
import '../styles.css';

const AsyncTypeahead = asyncContainer(Typeahead);

class Home extends React.Component {
    state = { isLoading: false, options: null };

    componentDidMount() {
        const { selectedCity, fetchSelectedCity } = this.props;
        
        if(!selectedCity) {
            if (!navigator.geolocation) {
                fetchSelectedCity({ cityName: 'Tel Aviv', cityId: '215854'});
            }
            else {
                navigator.geolocation.getCurrentPosition((success, error) => {
                    if(!error) {
                        const { longitude, latitude } = success.coords;
                        const localCity = GetCityFromLocation(latitude, longitude);

                        fetchSelectedCity(localCity);
                    }
                });
            }
        }
    }

    componentDidUpdate() {
        const { selectedCity, citiesDetails } = this.props;

        if(!citiesDetails || selectedCity.cityName !== citiesDetails.cityName) {
            this.props.fetchCityDetails(selectedCity);
        }
    }

    onSearch = async query => {
        if(query) {
            this.setState({
                isLoading: false,
                options: await GetCitiesOptions(query)
            });
        }
    }

    render(){
        const { citiesDetails } = this.props;
        const { isLoading, options } = this.state;

        if(citiesDetails) {
            if(citiesDetails.error) {
                return (
                    <div>
                        Failure
                        <ErrorModal errors={citiesDetails.error}/>
                    </div>
                );
            }
            return (
                <React.Fragment>
                    <Container>
                        <Row className="justify-content-center m-5">
                            <Col className="d-none d-sm-block" md='auto'>
                                <i className='fa search fa-search'></i>
                            </Col>
                            <Col lg={4} xs={12}>
                                <AsyncTypeahead
                                    id='input-city'
                                    isLoading={isLoading}
                                    onSearch={this.onSearch}
                                    options={options ? Object.keys(options) : []}
                                    onChange={cities => this.props.fetchSelectedCity(options[cities[0]])} // cities is an array of single selected city
                                />
                            </Col>
                        </Row>
                    </Container>
                    <Container id="weather-details" className="bordered pt-5">
                        <Row>
                            <Col className="d-none d-sm-block" lg={2}><img width={100} height={70} src={citiesDetails.icon} alt="weather-icon"></img></Col>
                            <Col md={{span: 7}} sm={12} className="pt-4">
                                <h4>{citiesDetails.cityName}</h4>
                                <h4>{citiesDetails.temperature.Metric.Value}<span>&#176;</span>c</h4>
                            </Col>
                            <Col lg={{span: 0}}><Button variant="primary" onClick={() => this.props.fetchToggleFavorites(citiesDetails)}>{`${citiesDetails.isFavorite ? 'Remove from' : 'Add to'} Favorites`}</Button></Col>
                            <Col>
                                <i md='auto' className={`heart fa ${citiesDetails.isFavorite ? 'fa-heart' : 'fa-heart-o'}`} ></i>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col className="p-2" md="auto"><h1>{citiesDetails.description}</h1></Col>
                        </Row>
                        <Row className="p-5 ml-5">
                            {
                                citiesDetails.forecast.map(({ dayOfWeek, temperature }) => {
                                    return (
                                        <Col key={dayOfWeek} md="auto" className="bordered p-5 mr-5">
                                            <h5>{dayOfWeek}</h5>
                                            <h5>{temperature}<span>&#176;</span>c</h5>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Container> 
                </React.Fragment>
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

export default connect(mapStateToProps, { fetchCityDetails, fetchSelectedCity, fetchToggleFavorites })(Home);