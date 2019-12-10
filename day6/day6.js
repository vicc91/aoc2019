const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'input.txt');

const puzzleInput = fs.readFileSync(pathFile, 'utf-8').split('\n');
//const testInput = [ "B)G", "G)H", "D)I", "E)J", "J)K", "K)L","COM)B", "B)C", "C)D", "D)E", "E)F"];

function orbitObject(orbit, orbits, objects) {
    const [objectA, objectB] = orbit.split(')');
    objects.add(objectA);
    objects.add(objectB);

    if (!orbits[objectA]) {
        orbits[objectA] = {
            parent: null,
            children: [objectB],
        }   
    } else {
        orbits[objectA].children.push(objectB);
    }

    if (!orbits[objectB]) {
        orbits[objectB] = {
            parent: objectA,
            children: [],
        }
    } else {
        orbits[objectB].parent = objectA;
    }
}

function getOrbits() {
    const orbits = {};
    const objects = new Set();
    puzzleInput.forEach(orbit => orbitObject(orbit, orbits, objects));

    return {
        orbits,
        objects
    }
}

function orbitCountChecksums () {
    const { orbits, objects } = getOrbits();

    return [...objects].reduce((acc, val) => {
        let count = 0;
        let parent = orbits[val].parent;
        while (parent) {
            count++;
            parent = orbits[parent].parent;
        }
        val = count;
        return acc + val;
    }, 0);
}
// Solution part 1
console.log(orbitCountChecksums());

function indirectOrbitsObject(object) {
    const { orbits } = getOrbits();
    const orbitsObject = [];
    let count = 0;
    let parent = orbits[object].parent;

    while (parent) {
        parent = orbits[parent].parent;
        count++;
        orbitsObject.push({ parent, count });
    }
    return orbitsObject;
}

function orbitalTransfersCount() {
    const you = indirectOrbitsObject('YOU');
    const san = indirectOrbitsObject('SAN');

    for (let i=0; i<you.length; i++) {
        for (let j=0; j<san.length; j++) {
            if (you[i].parent === san[j].parent) {
                return you[i].count + san[j].count;
            }
        } 
    }
}
// Solution Part 2
console.log(orbitalTransfersCount());