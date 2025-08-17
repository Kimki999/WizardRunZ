export function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function countDusty(board:number[][]) {
    let count = 0;
    board.forEach(row => {
        row.forEach(col => {
            if (col === 1) count++;
        });
    });
    return count;
}

export function padZero(num:number, length:number):string{
    return String(num).padStart(length, "0")
}