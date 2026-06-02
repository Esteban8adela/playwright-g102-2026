interface ITest {
    name: string;
    expected: string;
}

export const MOCK_DATA: ITest[] = [
    { name: 'Winter', expected: 'Winter' },
    { name: 'Bobby', expected: 'Bobby' },
    { name: 'Anna', expected: 'Anna' },
    { name: 'Pollomorongo', expected: 'Pollomorongo' }
];

interface ILogin {
    username: string;
    password: string;
}

export const LOGIN_DATA: ILogin[] = [
    { username: 'Hiroki', password: 'Mariana<3'},
    { username: 'Feerjmz', password: 'El_chacalon123'},
    { username: 'Esteban8a', password: 'FerNUN0'},
    { username: 'monsex', password: 'albert1234555'}
];