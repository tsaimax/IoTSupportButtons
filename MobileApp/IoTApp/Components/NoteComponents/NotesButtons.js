import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Button} from 'native-base';

export default class NotesButtons extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Button style={{margin: 10}} onPress={this.props.onAdd.bind(this)}>
                    <Text style={{fontSize: fontScale*1.5, color: 'white'}}>
                        ADD NOTES
                    </Text>
                </Button>
                <Button danger style={{margin: 10}} onPress={this.props.confirmClose.bind(this)}>
                    <Text style={{fontSize: fontScale*1.5, color: 'white'}}>
                        CLOSE REQUEST
                    </Text>
                </Button>
            </View>
        );
    }
}