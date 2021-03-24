"use strict";

var express = require("express");

var router = express.Router();

var pool = require("../db");

var jwtGenerator = require('../jwtGenerator'); //routers


router.post('/register', function _callee(req, res) {
  var _req$body, first_name, last_name, designation, department, business, email, bank_name, bank_branch, bank_ifsc, ac_no, emp, password, nameParts, username, newEmp, jwtToken;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, designation = _req$body.designation, department = _req$body.department, business = _req$body.business, email = _req$body.email, bank_name = _req$body.bank_name, bank_branch = _req$body.bank_branch, bank_ifsc = _req$body.bank_ifsc, ac_no = _req$body.ac_no;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM emp WHERE email = $1", [email]));

        case 4:
          emp = _context.sent;

          if (!(emp.rows.length > 0)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(401).json("Employee already exist!"));

        case 7:
          password = Math.random().toString(36).slice(-8);
          nameParts = email.split("@");
          username = nameParts.length == 2 ? nameParts[0] : null;
          _context.next = 12;
          return regeneratorRuntime.awrap(pool.query("INSERT INTO emp (username,first_name,last_name,designation,department,business,email,bank_name,bank_branch,bank_ifsc,account_no,password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *", [username, first_name, last_name, designation, department, business, email, bank_name, bank_branch, bank_ifsc, ac_no, bcryptPassword]));

        case 12:
          newEmp = _context.sent;
          jwtToken = jwtGenerator(newEmp.rows[0].emp_id);
          console.log("Your Password is ".concat(password));
          return _context.abrupt("return", res.json({
            jwtToken: jwtToken,
            password: password
          }));

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0.message);
          res.status(500).send("Server error");

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
});
router.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, emp, jwtToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM emp WHERE email = $1", [email]));

        case 4:
          emp = _context2.sent;

          if (!(emp.rows.length === 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(401).json("Invalid Credential"));

        case 7:
          if (!(password != emp.rows[0].password)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(401).json("Invalid Credential"));

        case 9:
          jwtToken = jwtGenerator(emp.rows[0].emp_id);
          return _context2.abrupt("return", res.json({
            jwtToken: jwtToken
          }));

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0.message);
          res.status(500).send("Server error");

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 13]]);
});
router.post("/verify", function (req, res) {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/", function _callee3(req, res) {
  var emp;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM emp WHERE emp_id = $1", [req.emp.id]));

        case 3:
          emp = _context3.sent;
          res.json(emp.rows[0]);
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);
          res.status(500).send("Server error");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;