import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Col, Row, Grid, Card, CardItem} from 'native-base';

import {getNotes} from '../../Modules/Notes.js';

export default class RequestRowContent extends Component{
    constructor(props){
        super(props);
        this.state = {rowColor: '#fff'};
    }
    
    componentDidMount(){
        this.determineUrgency();
        var reloadInterval = setInterval(this.determineUrgency.bind(this), 60000);
    }
        
    determineUrgency(){ 
        if(this.props.requestData.currstatus.S == "closed"){
            this.setState({rowColor: '#a3a3a3'});
        }
        else{
            var currTime = new Date();
            if(this.props.requestData.currstatus.S == "new"){
                var minutesSinceArrived = (currTime-this.props.requestData.timeStamp.S)/(60000);
                this.setRowColor(minutesSinceArrived);
            }
            else if(this.props.requestData.currstatus.S == "open"){
                callback = (json) => {
                    var notes = json['body-json'].Items;
                    if(notes != null){
                        lastServiceTime = notes[notes.length-1].timeStamp.S;
                        minutesSinceLastServiced = (currTime-lastServiceTime)/(60000); //maybe "cache" this?
                        this.setRowColor(minutesSinceLastServiced);
                    }
                };
                getNotes(this.props.requestData, callback);
            }
        }
        
        /*
        if(new Date()%2 == 0)
            this.setState({rowColor: '#EEE'});
        else
            this.setState({rowColor: '#d8d8d8'});
        */   
        //this.setState({rowColor: '#EEE'});
    }
    
    setRowColor(minutesDifferent){
        //have intervals be an input array?
        if(minutesDifferent < 5){
            this.setState({rowColor: '#ffffff'});
        }
        else if(minutesDifferent < 10){
            this.setState({rowColor: '#fdfd96'});
        }
        else if(minutesDifferent < 15){
            this.setState({rowColor: '#ffc65f'});
        }
        else{
            this.setState({rowColor: '#ff7b7b'});
        }
    }
    
    render() {
        //var rowColor = (this.props.rowID % 2) ? '#EEE' : '#d8d8d8'; //test colors
        var timestamp = new Date(Number(this.props.requestData.timeStamp.S));
        return (
            <Grid>
                <Card style={{backgroundColor: this.state.rowColor, padding: 10, borderRadius: 5}}>
                    <Row >
                        <Col size={0.25} style={{padding: 5}}>
                            <Text style={{fontSize: fontScale}}>
                                {timestamp.toLocaleDateString("en-us")}
                            </Text>
                            <Text style={{fontSize: fontScale}}>
                                {timestamp.toLocaleTimeString("en-us", {hour: "2-digit", minute: "2-digit"})}
                            </Text> 
                        </Col>
                        <Col size={0.3} style={{padding: 5}}>
                            <Text style={{fontSize: fontScale}}>
                                {this.props.requestData.location.S}
                            </Text>
                        </Col>
                        <Col size={0.25} style={{padding: 5}}>
                            <Text style={{fontSize: fontScale}}>
                                {this.props.requestData.item.S}
                            </Text>
                        </Col>
                        <Col size={0.2} style={{padding: 5}}>
                            {/*<Text style={{fontSize: fontScale}}>
                                {this.props.requestData.currstatus.S}
                            </Text>*/}
                        </Col>
                    </Row>
                </Card>
            </Grid>
        );
    }
}
