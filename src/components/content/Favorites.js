import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import history from '../../history';
import { GetCurrentWeather } from '../../apis/weatherApi';
import { fetchSelectedCity } from '../../actions';
import { GetFavorites } from '../../weatherLocalStorage';

class Favorites extends React.Component {
    state = { favorites: [] };

    componentDidMount() {
        this.updateFavorites();
    }

    updateFavorites = async () => {
        const favorsStorage = GetFavorites();
        let favorites = [];
        let cities = Object.keys(favorsStorage);

        for(var i = 0; i < cities.length; i++) {
            const cityName = cities[i];
            const cityId = favorsStorage[cityName];

            const citieWeather = await GetCurrentWeather(cityId);

            favorites.push({ cityName, ...citieWeather, cityId });
        }

        this.setState({ favorites });
    }

    renderHome = city => {
        this.props.fetchSelectedCity(city)
        history.push('/');
    }

    renderFavorites = () => {
        const { favorites } = this.state;

        if(favorites.length) {
            return favorites.map(city => {
                return (
                    <Col 
                        onClick={() => this.renderHome(city)} 
                        key={city.cityName} 
                        lg={3} 
                        md={12}
                        style={{ cursor: 'pointer' }}
                        className={`content${this.props.darkMode ? '-dark' : ''} bordered p-5 m-1`}
                    >
                        <Row className="justify-content-center">
                            <Col md={"auto"}><h3>{city.cityName}</h3></Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={"auto"}><h5>{!city.error ? city.temperature.Metric.Value : '--'}<span>&#176;</span>c</h5></Col>
                        </Row>
                        <Row className="justify-content-center mt-4">
                            <Col md={"auto"}><h4>{!city.error ? city.description : 'Failed getting weather'}</h4></Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={"auto"}><img src={!city.error ? city.icon : ''} alt="weather-icon"></img></Col>
                        </Row>
                    </Col>
                );
            });
        }
        else return <div>Favorites list is empty!</div>;
    }

    render() {
        return (
            <div className={`page${this.props.darkMode ? '-dark' : ''} pt-1`}>
                <Container>
                    <Row className="mt-5 justify-content-lg-center">
                        {this.renderFavorites()}
                    </Row>
                </Container>
            </div> 
        );
    }
};

const mapStateToProps = ({ darkMode }) => {
    return { darkMode };
}
export default connect(mapStateToProps, { fetchSelectedCity })(Favorites);