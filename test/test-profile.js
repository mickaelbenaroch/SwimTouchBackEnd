"use strict";

var chai = require('chai');  
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

chai.request(app)  
    .put('/profile')
    .send({email: 'valotkerbeni@gmail.com'})
    .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
    });
