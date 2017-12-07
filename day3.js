// (2n+1)² >= i
// 2n+1 >= sqrt(i)
// 2n >= sqrt(i)-1
// n >= (sqrt(i)-1) / 2
// 
// distance: n <= i <= (2n+1)/2
// nb de valeurs: 8n
// Trouver sur quel coté se situe i (c1 <= i <= c2)
// Trouver valeur médianne du coté (c1 + n)
// Réponse = n + Math.abs((c1 + n) - i);

function main(input) {
    let n = Math.ceil((Math.sqrt(input) - 1) / 2);
    let cmax = (2 * n + 1) ** 2;
    let cmin = cmax - 2 * n;

    while (cmin > input) {
        cmax = cmin;
        cmin -= 2 * n;
    }

    let medianne = cmin + n;
    return (n + Math.abs(input - medianne));
}

//A la bourrin
function main2(input, taille) {
    let array = Array(2 * taille + 1).fill([]);
    let n = 1,
        ligne = taille,
        colonne = taille + 1;

    array = array.map(() => {
        return Array(2 * taille + 1).fill(0);
    });
    array[taille][taille] = 1;
    while (n < taille) {
        while (taille - ligne <= n) {
            fill(array, ligne, colonne);
            if (array[ligne][colonne] > input) {
                return array[ligne][colonne];
            }
            ligne--;
        }
        while (taille - colonne <= n) {
            fill(array, ligne, colonne);
            if (array[ligne][colonne] > input) {
                return array[ligne][colonne];
            }
            colonne--;
        }
        while (ligne - taille <= n) {
            fill(array, ligne, colonne);
            if (array[ligne][colonne] > input) {
                return array[ligne][colonne];
            }
            ligne++;
        }
        while (colonne - taille <= n) {
            fill(array, ligne, colonne);
            if (array[ligne][colonne] > input) {
                return array[ligne][colonne];
            }
            colonne++;
        }
        n++;
    }
}

function fill(array, ligne, colonne) {
    array[ligne][colonne] += (array[ligne - 1][colonne - 1] || 0) +
        (array[ligne][colonne - 1] || 0) +
        (array[ligne + 1][colonne - 1] || 0) +
        (array[ligne + 1][colonne] || 0) +
        (array[ligne + 1][colonne + 1] || 0) +
        (array[ligne][colonne + 1] || 0) +
        (array[ligne - 1][colonne + 1] || 0) +
        (array[ligne - 1][colonne] || 0);
    console.log(array[ligne][colonne], ligne, colonne);
}

console.log('miaou');
main2(805, 10);