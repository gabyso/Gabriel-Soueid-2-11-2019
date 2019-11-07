import React from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import { fetchCityDetails, fetchSelectedCity, fetchToggleFavorites, fetchDarkMode } from '../../actions';
import { GetCitiesOptions, GetCityFromLocation } from '../../apis/weatherApi';
import ErrorModal from '../ErrorModal';
import '../styles.css';

const INIT_CITY = { cityName: 'Tel Aviv', cityId: '215854'};
const AsyncTypeahead = asyncContainer(Typeahead);

class Home extends React.Component {
    state = { isLoading: false, options: null };

    componentDidMount() {
        const { selectedCity, citiesDetails, fetchSelectedCity, fetchCityDetails } = this.props;

        // if(!selectedCity) {
        //     if (!navigator.geolocation) {
        //         fetchSelectedCity(INIT_CITY);
        //     }
        //     else {
        //         navigator.geolocation.getCurrentPosition((success, error) => {
                    
        //             if(!error) {
        //                 const { longitude, latitude } = success.coords;

        //                 this.getLocation(`${latitude},${longitude}`);
        //             }
        //         });
        //     }
        // }
        // else 
        console.log(this.props);
        if(!citiesDetails || (selectedCity.cityName !== citiesDetails.cityName)) {
            console.log(selectedCity);
            this.props.fetchCityDetails(selectedCity);
        }
    }

    componentDidUpdate() {
        const { selectedCity, citiesDetails } = this.props;
        
        if(!citiesDetails || (selectedCity.cityName !== citiesDetails.cityName)) {
            this.props.fetchCityDetails(selectedCity);
        }
        else if(!citiesDetails) this.props.fetchSelectedCity(INIT_CITY);
    }

    getLocation = async query => {
        const localCity = await GetCityFromLocation(query);
        
        if(!localCity.error) {
            this.props.fetchSelectedCity(localCity);
        }
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
        const { citiesDetails, darkMode, fetchDarkMode } = this.props;
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
                <div className={`page${darkMode ? "-dark" : ''}`}>
                    <Container>
                        <Row className="pt-3">
                            <Col lg={2}>
                                <Form.Check 
                                    type="switch"
                                    id="night-mode"
                                    label="Night mode"
                                    checked={darkMode}
                                    onChange={() => fetchDarkMode(!darkMode)}
                                />
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row className="justify-content-center m-5">
                            <Col className="d-none d-sm-block" md='auto'>
                                <i className={`fa search fa-search search-${darkMode ? 'dark' : 'light'}`}></i>
                            </Col>
                            <Col lg={4} xs={12}>
                                <AsyncTypeahead
                                    id='input-city'
                                    isLoading={isLoading}
                                    onSearch={this.onSearch}
                                    options={options ? Object.keys(options) : []}
                                    onChange={cities => this.onChange(options[cities[0]])} // cities is an array of single selected city
                                />
                            </Col>
                        </Row>
                    </Container>
                    <Container className={`bordered content${darkMode ? '-dark' : ''} pt-5`}>
                        <Row>
                            <Col className="d-none d-sm-block" lg={2}><img width={100} height={70} src={citiesDetails.icon} alt="weather-icon"></img></Col>
                            <Col md={{span: 6}} sm={12} className="pt-4">
                                <h4>{citiesDetails.cityName}</h4>
                                <h4>{citiesDetails.temperature.Metric.Value}<span>&#176;</span>c</h4>
                            </Col>
                            <Col lg={3} sm={12}><Button id="favorite-btn"  variant={`${darkMode ? 'dark' : 'info'}`} onClick={() => this.props.fetchToggleFavorites(citiesDetails)}>{`${citiesDetails.isFavorite ? 'Remove from' : 'Add to'} Favorites`}</Button></Col>
                            <Col md='auto'>
                                <i className={`heart fa ${citiesDetails.isFavorite ? 'fa-heart' : 'fa-heart-o'}`} ></i>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col className="p-2" md="auto"><h1>{citiesDetails.description}</h1></Col>
                        </Row>
                        <Row className="p-5 ml-5">
                            {
                                citiesDetails.forecast.map(({ dayOfWeek, temperature }) => {
                                    return (
                                        <Col key={dayOfWeek} md="auto" className={`bordered p-5 mr-5 card${darkMode ? '-dark' : ''}`}>
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
            <div className={`page${darkMode ? "-dark" : ''}`}>
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ citiesDetails, selectedCity, darkMode }) => {
    return {
        citiesDetails, 
        selectedCity,
        darkMode
    }
};

export default connect(mapStateToProps, { fetchCityDetails, fetchSelectedCity, fetchToggleFavorites, fetchDarkMode })(Home);