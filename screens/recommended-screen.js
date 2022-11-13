import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';

export default class Recommended extends React.Component {

    constructor() {
        super();
        this.state = {
            data : []
        }
    }

    getData = () => {
        const url = 'http://127.0.0.1:5000/recommended-articles'
        axios.get(url).then(async (response) => {
            this.setState({
                data : response.data.data
            })
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    componentDidMount() {
        this.getData()
    }

    renderItems = ({item, index}) => {
        return(
            <Card
                key = {`card-${index}`}
                image = {{uri : item.poster_link}}
                imageProps = {{resizeMode : cover}}
                featuredTitle = {item.title}
                containerStyle = {styles.cardContainer}
                featuredTitleStyle = {styles.title}
                featuredSubtitle = {`${item.release_date.split('-')[0]} | item.runtime`}
                featuredSubtitleStyle = {styles.subtitle}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data = {this.state.data}
                    renderItem = {this.renderItems}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        flex : 1,
        borderRadius : 10,
        justifyContent : 'center',
        height : 100,
        marginBottom : 20,
    },
    title: {
        color : 'lightblue',
        alignSelf : 'flex-start',
        paddingLeft : 15,
        marginTop : 65,
        fontSize : 20, 
        fontWeight : 'bold'
    },
    subtitle: {
        alignSelf : 'flex-start',
        paddingLeft : 15,
        fontSize : 15,
    }
});
