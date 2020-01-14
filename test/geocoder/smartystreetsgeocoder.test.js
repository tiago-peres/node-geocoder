(function() {
    const chai = require("chai"), should = chai.should(), expect = chai.expect, sinon = require("sinon");

    const SmartyStreets = require("../../lib/geocoder/smartystreetsgeocoder.js");
    const HttpAdapter = require("../../lib/httpadapter/httpadapter.js");

    const mockedHttpAdapter = {
        get: function() {}
    };

    describe("SmartyStreets", () => {

        describe("#constructor" , () => {

            test("an http adapter must be set", () => {

                expect(function() {new SmartyStreets();}).to.throw(Error, "SmartyStreets need an httpAdapter");
            });

            test("an auth-id and auth-token must be set", () => {

                expect(function() {new SmartyStreets(mockedHttpAdapter);}).to.throw(Error, "You must specify an auth-id and auth-token!");
            });

            test("Should be an instance of SmartyStreets", () => {

                const smartyStreetsAdapter = new SmartyStreets(mockedHttpAdapter, "AUTH_ID", "AUTH_TOKEN");

                smartyStreetsAdapter.should.be.instanceof(SmartyStreets);
            });

        });

        describe("#geocode" , () => {

            test("Should call httpAdapter get method", () => {
              const mock = sinon.mock(mockedHttpAdapter);
              mock.expects("get").withArgs("https://api.smartystreets.com/street-address", {
                "street": "1 Infinite Loop, Cupertino, CA",
                "auth-id": "AUTH_ID",
                "auth-token": "AUTH_TOKEN",
                "format": "json"
              }).once().returns({then: function() {}});

              const smartyStreetsAdapter = new SmartyStreets(mockedHttpAdapter, "AUTH_ID", "AUTH_TOKEN");

              smartyStreetsAdapter.geocode("1 Infinite Loop, Cupertino, CA");
              mock.verify();
            });
        });

        describe("#reverse" , () => {
            test("Should throw expection", () => {
              const smartyStreetsAdapter = new SmartyStreets(mockedHttpAdapter, "AUTH_ID", "AUTH_TOKEN");

                expect(function() {
                        smartyStreetsAdapter.reverse(10.0235,-2.3662);
                }).to.throw(Error, "SmartyStreets doesnt support reverse geocoding!");
            });
        });
    });
})();
