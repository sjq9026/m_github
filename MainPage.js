/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    ListView,
    RefreshControl,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const datas = ["张三","李四","王五","赵六","王二小","三胖子","川普","张三","李四","王五","赵六","王二小","三胖子","川普"];

export default class MainPage extends Component<{}> {
  constructor(props){
    super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state={
          dataSource:ds.cloneWithRows(datas),
          refreshing:false,
          loadingMore:false,
      }
      this.renderFooterView =  this.renderFooterView.bind(this);
      this.reloadWordData = this.reloadWordData.bind(this);
      this.reloadWordData();

  }



  render() {
    return (
      <View style={styles.container}>
      <ListView
          refreshControl={
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.reloadWordData}
            />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.item}>{rowData}</Text>}
          renderFooter={this.renderFooterView}
          onEndReached={ this._toEnd.bind(this) }
          onEndReachedThreshold={5}/>
      </View>
    );
  }
    reloadWordData(){
        this.setState({
            refreshing:false
        })
    }


    renderFooterView(){
      if(this.state.loadingMore){
          return (<ActivityIndicator style={{ marginVertical:20 }}/>);
      }else{
          return (<View style={{marginVertical: 10}}>
            <Text>加载更多</Text>
          </View>);
      }
    }
    _toEnd(){
        this.setState({
            loadingMore:true
        });
        var t = this;

        ToastAndroid.show("加载更多",1000);
        setInterval(function () {
            t.setState({
                loadingMore:false
            })
        },2000);
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    item:{
    height:100
    },
});
