import * as calculator from "./phepcong";

export const checkNhanChia = (mangChuSo) => {
    console.log(mangChuSo)
    var mangPhepTinhUuTien = [];
    for (let i = 0; i < mangChuSo.length - 1; i++) {
        if (mangChuSo[i] === "x" || mangChuSo[i] === "/") {
            mangPhepTinhUuTien.push(i);
        }
    }
    return mangPhepTinhUuTien;
};

// export const NhanChiaTrongNgoac = (mangPhepTinhUuTien, mangChuSo) => {
//     console.log(mangChuSo)
//     console.log(mangPhepTinhUuTien)
//     var result = "";
//     for (let i = 0; i < mangPhepTinhUuTien.length; i++) {
//         if (mangChuSo[mangPhepTinhUuTien[i]] === "x") {
//             result = calculator.checkNhan(
//                 mangChuSo[mangPhepTinhUuTien[i] - 1],
//                 mangChuSo[mangPhepTinhUuTien[i] + 1]
//             );
//             mangChuSo.splice(mangPhepTinhUuTien[i] - 1, 3);
//             mangChuSo.splice(mangPhepTinhUuTien[i] - 1, 0, result);
//             for (let j = i + 1; j < mangPhepTinhUuTien.length; j++) {
//                 if (mangPhepTinhUuTien[j]) {
//                     mangPhepTinhUuTien[j] = mangPhepTinhUuTien[j] - 2;
//                 }
//             }
//             result = "";
//         }
//     }
//     return { mangPhepTinhUuTien: mangPhepTinhUuTien, mangChuSo: mangChuSo };
// };


export const NhanChia = (mangPhepTinhUuTien, mangChuSo) => {
    console.log(mangChuSo)
    console.log(mangPhepTinhUuTien)
    var result = "";
    for (let i = 0; i < mangPhepTinhUuTien.length; i++) {
        if (mangChuSo[mangPhepTinhUuTien[i]] === "x") {
            result = calculator.checkNhan(
                mangChuSo[mangPhepTinhUuTien[i] - 1],
                mangChuSo[mangPhepTinhUuTien[i] + 1]
            );
            mangChuSo.splice(mangPhepTinhUuTien[i] - 1, 3);
            mangChuSo.splice(mangPhepTinhUuTien[i] - 1, 0, result);
            for (let j = i + 1; j < mangPhepTinhUuTien.length; j++) {
                if (mangPhepTinhUuTien[j]) {
                    mangPhepTinhUuTien[j] = mangPhepTinhUuTien[j] - 2;
                }
            }
            result = "";
        }
    }
    return { mangPhepTinhUuTien: mangPhepTinhUuTien, mangChuSo: mangChuSo };
};
