/* eslint-disable camelcase */
const { BadRequest } = require("http-errors");
// const { shapeValidator } = require("../middlewares/validationMid");
// const { rectangleVal } = require("./validationSchema");
class Shape {
  constructor(shape, dimensions) {
    this.shape = shape;
    this.dimensions = dimensions;
    this.area = 0;
    this.message = "";
    this.calculation = "";
    this.formula = "";
  }

  // function to switch the shapes and attach them to the proper function they belong to
  validateDimension() {
    switch (this.shape) {
      case "square":
        this.calculateSquare();
        break;
      case "rectangle":
        this.calculateRectangle();
        break;
      case "triangle":
        this.calculateTriangele();
        break;
      case "circle":
        this.calculateCircle();
        break;
      default:
        this.unsupportedShape();
        // break;
    }
    return this;
  }

  // function to compute the area of a square
  calculateSquare() {
    // check the values of the dimension
    if (Object.keys(this.dimensions).length !== 1) {
      throw BadRequest("invalid parameters for a square");
    }
    if (!this.dimensions.side || this.dimensions.side === "") {
      throw BadRequest("square data not complete");
    }

    const formula = "sides ^ 2";
    this.formula = formula;
    const calculation = `${this.dimensions.side} ** 2`;
    this.calculation = calculation;
    this.area = (this.dimensions.side ** 2).toFixed(2);
    return this.area;
  }

  // function to compute the area of a rectangle
  calculateRectangle() {
    if (Object.keys(this.dimensions).length < 2 || Object.keys(this.dimensions).length > 2) {
      throw BadRequest("Invalid parameters for a rectangle, provide only length and breadth");
    }
    if (!this.dimensions.length || !this.dimensions.breadth) {
      throw BadRequest("rectangle data is not complete, provide only length and breadth");
    }

    const formula = "length * breadth";
    const calculation = `${this.dimensions.length} * ${this.dimensions.breadth}`;
    this.area = (this.dimensions.length * this.dimensions.breadth).toFixed(2);
    this.formula = formula;
    this.calculation = calculation;
    return this.area;
  }

  // function to compute the area of a triangle
  calculateTriangele() {
    if (Object.keys(this.dimensions).length !== 3) {
      throw BadRequest("Invalid parameters for a triangle, provide only length_a, length_a and length_c");
    }
    const { length_a, length_b, length_c } = this.dimensions;
    if (!length_a || !length_b || !length_c) {
      throw BadRequest("triangle data is not complete");
    }
    const formula = "√s * (s − length_a) * (s − length_b) * (s − length_c)";
    const s = (length_a + length_b + length_c) / 2;
    const calculation = `√${s} * (${s} - ${length_a}) * (${s} - ${length_b})  * (${s} - ${length_c})`;
    const X = (s * (s - length_a) * (s - length_b) * (s - length_c));
    const area = Math.sqrt(X);
    this.area = area.toFixed(2);
    this.calculation = calculation;
    this.formula = formula;
    return this.area;
  }

  // function to compute the area of a circle
  calculateCircle() {
    if (Object.keys(this.dimensions).length !== 1) {
      throw BadRequest("Invalid parameters for a circle, provide only radius");
    }
    if (!this.dimensions.radius) {
      throw BadRequest("circle data is not complete");
    }
    const area = (Math.PI * this.dimensions.radius) ** 2;
    const formula = "π * radius²";
    const D = this.dimensions.radius ** 2;
    const calculation = `${Math.PI} * ${D}`;
    this.area = area.toFixed(2);
    this.calculation = calculation;
    this.formula = formula;
    return this.area;
  }

  // eslint-disable-next-line class-methods-use-this
  // handles the shapes that are not supported
  unsupportedShape() {
    this.message = "This shape isnt supported";
    return this.message;
  }
}

module.exports = Shape;
