var assert = require('chai').assert,
expect = require('chai').expect,
Graph = require("./graph");


//console.log(graph1.getNeighboursFor("Mimi"));
//console.log(graph1.pathBetween("Mimi", "Evgeni"));
//graph1.toString();

var graph1 = new Graph({"Mimi":["Rado", "Pesho", "Petya", "Ivan"],"Ivan":["Mimi", "Evgeni"]});
var graph2 = new Graph({"Mimi":["Toni"]});
var graph3 = new Graph({"Mimi":["Petya", "Viki"], "Petya":["Ivan", "Mitko", "Mimi"], "Mitko":["Mimi", "Viki", "Plamen"], "Plamen":["Desi"]});

describe('Graph', function(){

  describe('getNeighboursFor()', function(){
    it('should return the neighbours of a given node', function(){
      assert.sameMembers(graph1.getNeighboursFor("Mimi"),["Rado", "Pesho", "Petya", "Ivan"], "The direct successors of Mimi are Rado, Pesho, Petya");
      assert.sameMembers(graph3.getNeighboursFor("Mitko"),["Mimi", "Viki", "Plamen"], "The direct successors of Mitko are Mimi, Viki, Plamen");
      assert.strictEqual(graph3.getNeighboursFor("Ivan"),"No information", "The direct successors of Ivan are not given in the graph");
    })
  })

  describe('pathBetween()', function(){
    it('should return true if there is a path between two nodes', function(){
      expect(graph1.pathBetween("Mimi","Evgeni")).to.be.true;
      expect(graph1.pathBetween("Ivan","Evgeni")).to.be.true;
      expect(graph2.pathBetween("Mimi","Toni")).to.be.true;
      expect(graph3.pathBetween("Mimi","Plamen")).to.be.true;
      expect(graph3.pathBetween("Petya","Mimi")).to.be.true;
      expect(graph3.pathBetween("Mitko","Petya")).to.be.true;
    })
  })
describe('pathBetween()', function(){
    it('should return false if there is a path between two nodes', function(){
      expect(graph1.pathBetween("Pesho","Evgeni")).to.be.false;
      expect(graph1.pathBetween("Petya","Mimi")).to.be.false;
      expect(graph3.pathBetween("Plamen","Mimi")).to.be.false;
    })
  })
})
