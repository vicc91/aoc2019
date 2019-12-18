class Intcode {
    constructor(program) {
        this.program = [...program];
        this.index = 0;
        this.stdin = [];
        this.stdout = [];
        this.lastOpcode = 0;
    }
    static opcodesSize = {
        1: 4,
        2: 4,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 4,
        8: 4,
        99: 0,
    };
    static direct = {
        1: [3],
        2: [],
        3: [1,2,7,8],
    }
    step() {
        const {
            optionCode,
            parameterMode1,
            parameterMode2,
            parameterMode3
        } = this.readInstruction();
        let branched = false;
        let par1, par2, par3;

        switch (optionCode) {
            case 1:
                par1 = this.getValueParameter(1, parameterMode1);
                par2 = this.getValueParameter(2, parameterMode2);
                par3 = this.getValueParameter(3, parameterMode3);
                this.program[par3] = par1 + par2;
                break;
            case 2:
                par1 = this.getValueParameter(1, parameterMode1);
                par2 = this.getValueParameter(2, parameterMode2);
                par3 = this.getValueParameter(3, parameterMode3);
                this.program[par3] = par1 * par2;
                break;
            case 3:
                const value = this.stdin[0];
                this.stdin = this.stdin.slice(1);
                par1 = this.getValueParameter(1, parameterMode1);
                this.program[par1] = value;
                break;
            case 4: 
                par1 = this.getValueParameter(1, parameterMode1);
                this.stdout.push(par1);
                break;
            case 5: 
                par1 = this.getValueParameter(1, parameterMode1);
                par2 = this.getValueParameter(2, parameterMode2);
                if (par1 !== 0) {
                    this.index = par2;
                    branched = true;
                }
                break;
            case 6:
                par1 = this.getValueParameter(1, parameterMode1);
                par2 = this.getValueParameter(2, parameterMode2);
                if (par1 === 0) {
                    this.index = par2;
                    branched = true;
                }
                break;
            case 7:
                par1 = this.getValueParameter(1, parameterMode1);
                par2 = this.getValueParameter(2, parameterMode2);
                par3 = this.getValueParameter(3, parameterMode3);
                this.program[par3] = par1 < par2 ? 1 : 0;
                break;
            case 8:
                par1 = this.getValueParameter(1, parameterMode1);
                par2 = this.getValueParameter(2, parameterMode2);
                par3 = this.getValueParameter(3, parameterMode3);
                this.program[par3] = par1 === par2 ? 1 : 0;
                break;
            default:
                break;
        }
        this.lastOpcode = optionCode;
        if (!branched) {
            this.index += Intcode.opcodesSize[optionCode];
        }
    }
    readInstruction() {
        const instruction = this.program[this.index];
        const optionCode = instruction % 100;
        let parameterMode1 = parseInt(instruction / 100) % 10;
        let parameterMode2 = parseInt(instruction / 1000) % 10;
        let parameterMode3 = parseInt(instruction / 10000) % 10;

        const direct1 = Intcode.direct[1].find(el => el === optionCode);
        if (direct1) {
            parameterMode1 = 1;
        }
        const direct2 = Intcode.direct[2].find(el => el === optionCode);
        if (direct2) {
            parameterMode2 = 1;
        }
        const direct3 = Intcode.direct[3].find(el => el === optionCode);
        if (direct3) {
            parameterMode3 = 1;
        }
        return {
            optionCode,
            parameterMode1,
            parameterMode2,
            parameterMode3
        };   
    }
    getValueParameter(i, mode) {
        let parameter = this.program[this.index + i];
        
        if (mode === 0) {
            parameter = this.program[parameter];
        }
        return parameter;
    }
    simulate() {
        let stop = this.stop();
        
        while (!stop) {
            this.step();
            stop = this.stop();
        }
    }
    stop() {
        return this.lastOpcode === 99;
    }
}

module.exports = {
    Intcode
}