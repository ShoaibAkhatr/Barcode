import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  backimageView: {
    flex: .40,
    backgroundColor:"white"
  },
  TopView: {
    height:30,
    backgroundColor: '#629846',
  },
  backIamge: {
    width: "100%",
    height: "100%"
  },
  bottomCointainer: {
    flex: .60,
    backgroundColor: "#f4f4f4"
  },
  Minitext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: "3%",
    marginLeft: "5%"
  },
  FlatView: {
    flex: .97,
  },
  Card: {
    width: "90%",
    borderBottomWidth: 1,
    marginTop: "2%",
    paddingVertical: "3%",
    marginHorizontal: "5%",
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    borderBottomColor: '#dfdfdf',
  },
  imagestyle: {
    width: 20,
    height: 20,
    alignSelf: "center",
    marginRight:"4%"
  },
  WeightView: {
    width: "50%",
    alignItems: "flex-end",
  },
  ImageView: {
    width: "50%",
    alignItems: "flex-end",
    flexDirection: 'row',
  },
  nametext: {
    fontSize: 14,
    fontWeight: "400",
    color: 'black',
  },
  GrayView: {
    alignSelf: "center",
    paddingHorizontal: "5%",
    backgroundColor: '#dfdfdf',
    marginVertical: "3%",
    borderRadius: 4,
    width: "90%",
    paddingVertical:"3%",
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  NutrationText: {
    fontSize: 14,
    fontWeight: "400",
    color: 'black',
    textAlignVertical: "center",
  },
  Headeriamge:{
    width:"100%",
    height:'100%',
    resizeMode:'contain',
    alignSelf:"center"
  }
})

export default style