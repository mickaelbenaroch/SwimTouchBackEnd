"use strict";

const app = require('../app');

var chai = require('chai');  
var chaiHttp = require('chai-http');
var assert = chai.assert;
var expect = chai.expect;

chai.use(chaiHttp);


describe('Profile', function() {
    describe('getProfile()', function() {
        it('should return true/200 when the profile is exist', function() {
            chai.request(app)  
            .post('/profile')
            .send('yossi@gmail.com')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.isTrue).to.be.true;
            });  
        });          
    });
});
