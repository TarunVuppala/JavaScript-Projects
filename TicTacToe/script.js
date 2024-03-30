let p = document.getElementsByClassName("p1")[0];
let details = document.getElementsByClassName("details")[0];
let player = document.getElementsByClassName("player")[0];
let p1Name = "";
let p2Name = "";
let currPlayer = null;
let win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let p1Boxes = [];
let p2Boxes = [];
let boxes = document.getElementsByClassName("box");
let board = document.getElementsByClassName("board")[0];


const winner = (boxes, name) => {
    for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (boxes.includes(a.toString()) && boxes.includes(b.toString()) && boxes.includes(c.toString())) {
            alert(`${name} wins!`);
            resetGame();
            break;
        }
    }
};

const resetGame = () => {
    currPlayer = null;
    details.classList.remove("hide");
    board.classList.add("hide");
    player.innerHTML = ``;
    Array.from(boxes).forEach(box => {
        box.innerHTML = "";
    });
};

const fun = () => {
    p1Name = document.getElementById("player1").value;
    document.getElementById("player1").value = "";
    p2Name = document.getElementById("player2").value;
    document.getElementById("player2").value = "";

    details.classList.add("hide");
    board.classList.remove("hide");
    player.innerHTML = `${p1Name} plays`;
    currPlayer = p1Name;
    board.style.cursor= 'url("./x.svg"), auto';
};

Array.from(boxes).forEach(box => {
    box.addEventListener("click", () => {
        if (currPlayer === p1Name && !p1Boxes.includes(box.id) && !p2Boxes.includes(box.id)) {
            box.innerHTML = "X";
            p1Boxes.push(box.id);
            currPlayer = p2Name;
            setTimeout(() => {
                winner(p1Boxes, p1Name);
            }, 100);
            player.innerHTML = `${p2Name} plays`;
            board.style.cursor= 'url("./o.svg"), auto';
        } else if (currPlayer === p2Name && !p2Boxes.includes(box.id) && !p1Boxes.includes(box.id)) {
            box.innerHTML = "O";
            p2Boxes.push(box.id);
            currPlayer = p1Name;
            setTimeout(() => {
                winner(p2Boxes, p2Name);
            }, 100);
            player.innerHTML = `${p1Name} plays`;
            board.style.cursor= 'url("./X.svg"), auto';
        }
    });
});
