import * as util from './util.js';

class Doge {
    constructor(name) {
        this.name = name;
        this.id = `doge-${name}-${Date.now()}`;
        this.maxStatements = 6;
        this.statementNmbr = 1;
        this.statements = [];
        this.dogeDirections = {
            right: 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png',
            left: 'https://raw.github.com/ljalonen/libdoge/master/img/doge_r.png'
        };

        const possibleDirections = ['left', 'right'];
        this.dogeDirection = possibleDirections[util.random(0, possibleDirections.length - 1)];

        this.figure = document.createElement('img');
        this.figure.id = this.id;
        this.figure.src = this.dogeDirections[this.dogeDirection];
        this.figure.setAttribute('rel', 'bottom');
        this.figure.style.position = 'fixed';
        this.figure.style.left = '0px';
        this.figure.style.bottom = '0px';
        this.figure.style.zIndex = 999999;
        document.body.appendChild(this.figure);

        setInterval(() => this.bark(), util.random(300, 500));
    }

    getID() {
        return this.id;
    }

    getFigure() {
        return this.figure;
    }

    getLocation() {
        return {
            left: parseInt(this.figure.style.left),
            bottom: parseInt(this.figure.style.bottom),
            side: this.figure.getAttribute('rel')
        };
    }

    bark() {
        if (this.statements.length >= this.maxStatements) return false;

        const statementID = `${this.id}-statement-${this.statementNmbr++}`;
        const statement = document.createElement('div');
        statement.id = statementID;
        statement.innerHTML = dataminer.getSentence();

        this.statements.push(statementID);
        document.body.appendChild(statement);

        const widthBounds = {
            left: Math.floor(0.075 * window.innerWidth),
            right: Math.floor(0.925 * window.innerWidth - statement.clientWidth)
        };

        const heightBounds = {
            bottom: Math.floor(0.075 * window.innerHeight),
            top: Math.floor(0.925 * window.innerHeight - statement.clientHeight)
        };

        statement.style.position = 'fixed';
        statement.style.bottom = `${util.random(heightBounds.bottom, heightBounds.top)}px`;
        statement.style.left = `${util.random(widthBounds.left, widthBounds.right)}px`;
        statement.style.zIndex = 999999;
        statement.style.opacity = 1;
        statement.style.fontSize = '2.75em';
        statement.style.textShadow = '-2px 0px 2px rgba(0, 0, 0, 1)';
        statement.style.fontFamily = 'Comic Sans MS';
        statement.style.color = `rgb(${util.random(0,255)},${util.random(0,255)},${util.random(0,255)})`;

        const fadeTime = util.random(300, 1000);
        setTimeout(() => {
            animation.fadeOut(statementID, 1);
            setTimeout(() => {
                this.statements.splice(this.statements.indexOf(statementID), 1);
            }, fadeTime);
        }, fadeTime);
    }

    plz() {
        if (Math.random() < 0.33) this.turnAround();
        if (Math.random() < 0.5) {
            const distance = util.random(500, 1000);
            this.run(distance);
        } else {
            this.hide();
        }
    }

    hide() {
        animation.hide(this, () => {
            setTimeout(() => {
                this.teleport(true);
                this.ambush();
            }, util.random(0, 2500));
        });
    }

    teleport(isHidden = false) {
        const sides = ['top', 'bottom', 'left', 'right'];
        const side = sides[util.random(0, sides.length - 1)];
        this.figure.setAttribute('rel', side);

        if (side === 'top') {
            util.flipElement(this.figure, 180);
            this.figure.style.bottom = (isHidden ? window.innerHeight : window.innerHeight - this.figure.clientHeight) + 'px';
            this.figure.style.left = util.random(0, window.innerWidth - this.figure.clientWidth) + 'px';
        } else if (side === 'bottom') {
            util.flipElement(this.figure, 0);
            this.figure.style.bottom = (isHidden ? -this.figure.clientHeight : 0) + 'px';
            this.figure.style.left = util.random(0, window.innerWidth - this.figure.clientWidth) + 'px';
        } else if (side === 'left') {
            util.flipElement(this.figure, 90);
            this.figure.style.bottom = util.random(0, window.innerHeight - this.figure.clientWidth) + 'px';
            this.figure.style.left = (isHidden ? -this.figure.clientHeight : 0) + 'px';
        } else if (side === 'right') {
            util.flipElement(this.figure, 270);
            this.figure.style.bottom = util.random(0, window.innerHeight - this.figure.clientWidth) + 'px';
            this.figure.style.left = (isHidden ? window.innerWidth : window.innerWidth - this.figure.clientHeight) + 'px';
        }
    }

    ambush() {
        animation.ambush(this, () => {
            setTimeout(() => {
                this.plz();
            }, util.random(0, 2500));
        });
    }

    run(distance) {
        animation.run(this, distance, () => this.plz());
    }

    escape() {
        this.figure.parentNode.removeChild(this.figure);
        this.maxStatements = 0;
    }

    getDirection() {
        return this.dogeDirection;
    }

    turnAround() {
        this.dogeDirection = this.dogeDirection === 'right' ? 'left' : 'right';
        this.figure.src = this.dogeDirections[this.dogeDirection];
    }
}

export default Doge;