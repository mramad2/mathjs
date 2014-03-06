var assert = require('assert'),
    math = require('../../../index')(),
    string = math.string,
    concatenate = math.concatenate;

describe('string', function() {

  it('should be \'\' if called with no argument', function() {
    assert.equal(string(), '');
  });

  it('should be \'true\' if called with true, \'false\' if called with false', function() {
    assert.equal(string(true), 'true');
    assert.equal(string(false), 'false');
  });

  it('should be the identity if called with a string', function() {
    assert.equal(string('hello'), 'hello');
    assert.equal(string(''), '');
    assert.equal(string(' '), ' ');
  });

  it('should convert the elements of an array to strings', function() {
    assert.deepEqual(string([[2,true],['hi',null]]), [['2', 'true'],['hi', 'null']]);
  });

  it('should convert the elements of a matrix to strings', function() {
    assert.deepEqual(string(math.matrix([[2,true],['hi',null]])),
        new math.type.Matrix([['2', 'true'],['hi', 'null']]));
  });

  it('should convert a number to string', function() {
    assert.equal(string(1/8), '0.125');
    assert.equal(string(2.1e-3), '0.0021');
    assert.equal(string(123456789), '1.23456789e+8');
    assert.equal(string(2000000), '2e+6');
  });

  it('should convert a bignumber to string', function() {
    assert.equal(string(math.bignumber('2.3e+500')), '2.3e+500');
  });

  it('should convert a complex number to string', function() {
    assert.equal(string(math.complex(2,3)), '2 + 3i');
  });

  it('should convert a unit to string', function() {
    assert.equal(string(math.unit('5cm')), '50 mm');
  });

  it('should concatenate two strings', function() {
    assert.equal(concatenate('hello ', 'world'), 'hello world');
    assert.equal(concatenate('str', 123), 'str123');
    assert.equal(concatenate(123, 'str'), '123str');
  });

  it('should throw an error if called with wrong number of arguments', function() {
    assert.throws(function () {string(1,2)}, math.error.ArgumentsError);
    assert.throws(function () {string(1,2,3)}, math.error.ArgumentsError);
  });
});
