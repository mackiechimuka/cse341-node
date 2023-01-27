const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const newContact  = async (req,res,next)=>{
  const contact ={
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb
  .getDb()
  .db()
  .collection('contacts')
  .insertOne(contact);
  if(result.acknowledged){
    res.status(201).json(result);
  } else{
    returnError(res,result.error);
  }
};

const updateContact = async (req,res,next)=>{
  const userId = new ObjectId(req.params.id);
  const contact ={
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
const result = await mongodb.getDb()
.db()
.collection('contacts')
.replaceOne({_id:userId},contact);
if(result.modifiedCount >  0){
  res.status(204).send()
} else if (result.modifiedCount <  0){
  returnError(res,result.error);
}
  
};

const deleteContact  = async (req,res,next) =>{
  const userId = new ObjectId(req.params.id);
  result = await mongodb.getDb()
  .db()
  .collection('contacts')
  .deleteOne({_id:userId},true);
  if(!response.reject){
    res.status(204).send();
  }else{
    returnError(res,result.error);
  }
}


module.exports = { getAll, getSingle ,deleteContact,updateContact,newContact};