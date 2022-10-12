var assert = require('assert'); 
var app = require('../server.js');
var http = require('http');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);


describe('Server Test', () => {

    before(function() {
        console.log("before test");
    });

    after(function() {
        console.log("after test");
    });

    
});