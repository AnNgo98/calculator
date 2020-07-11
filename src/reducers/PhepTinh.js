import * as PhepTinhConstants from "../constants/PhepTinh";
import findIndex from "lodash/findIndex";
import * as calculator from "../helpers/phepcong";
import * as checkUuTien from "../helpers/CheckUuTien";
const reducer = (
    state = {
        mangChuSo: [],
        // mangPhepTinh: [],
        ketqua: "",
        history: [],
    },
    action
) => {
    switch (action.type) {
        case PhepTinhConstants.PUSHVALUE:
            var vitri = "";
            var res = "";
            var s = "";
            var mangPhepTinhUuTien = [];
            var result = "";
            var { mangChuSo, screen } = action.data;
            while (
                mangChuSo.indexOf("(") !== -1 ||
                mangChuSo.indexOf(")") !== -1
            ) {
                res = "";
                vitri = "";
                if (
                    mangChuSo.indexOf("(") !== -1 ||
                    mangChuSo.indexOf(")") !== -1
                ) {
                    mangPhepTinhUuTien = checkUuTien.checkNhanChia(
                        mangChuSo.slice(
                            mangChuSo.indexOf("(") + 1,
                            mangChuSo.indexOf(")")
                        )
                    );
                    console.log(mangPhepTinhUuTien);
                    console.log(
                        mangChuSo.slice(
                            mangChuSo.indexOf("(") + 1,
                            mangChuSo.indexOf(")")
                        )
                    );
                    for (let i = 0; i < mangPhepTinhUuTien.length; i++) {
                        if (
                            mangChuSo.slice(
                                mangChuSo.indexOf("(") + 1,
                                mangChuSo.indexOf(")")
                            )[mangPhepTinhUuTien[i]] === "x" ||
                            mangChuSo.slice(
                                mangChuSo.indexOf("(") + 1,
                                mangChuSo.indexOf(")")
                            )[mangPhepTinhUuTien[i]] === "/"
                        ) {
                            res = checkUuTien.NhanChia(
                                mangPhepTinhUuTien,
                                mangChuSo.slice(
                                    mangChuSo.indexOf("(") + 1,
                                    mangChuSo.indexOf(")")
                                )
                            );
                            console.log(res);
                            // mangChuSo = res.mangChuSo;
                            // mangPhepTinhUuTien = res.mangPhepTinhUuTien;
                        }
                    }
                    if (res.mangChuSo) {
                        for (let i = 0; i < res.mangChuSo.length; i++) {
                            if (
                                res.mangChuSo[i] === "+" ||
                                res.mangChuSo[i] === "-"
                            ) {
                                console.log(
                                    res.mangChuSo[i - 1],
                                    res.mangChuSo[i + 1]
                                );
                                result = calculator.checkCongTru(
                                    res.mangChuSo[i - 1],
                                    `${res.mangChuSo[i]}${res.mangChuSo[i + 1]}`
                                );
                                console.log(result);
                                res.mangChuSo.splice(i - 1, 3);
                                res.mangChuSo.splice(i - 1, 0, result);
                                result = "";
                                i = -1;
                            }
                            console.log(res.mangChuSo);
                        }
                        mangPhepTinhUuTien = [];
                        vitri = mangChuSo.indexOf("(");
                        mangChuSo.splice(
                            mangChuSo.indexOf("("),
                            mangChuSo.indexOf(")") + 1 - mangChuSo.indexOf("(")
                        );
                        mangChuSo.splice(vitri, 0, res.mangChuSo[0]);
                        console.log(mangChuSo);
                    } else {
                        console.log(mangChuSo);
                        for (
                            let i = mangChuSo.indexOf("(") + 1;
                            i < mangChuSo.indexOf(")");
                            i++
                        ) {
                            console.log(i);
                            if (mangChuSo[i] === "+" || mangChuSo[i] === "-") {
                                console.log(mangChuSo[i - 1], mangChuSo[i + 1]);
                                result = calculator.checkCongTru(
                                    mangChuSo[i - 1],
                                    `${mangChuSo[i]}${mangChuSo[i + 1]}`
                                );
                                console.log(result);
                                mangChuSo.splice(i - 1, 3);
                                mangChuSo.splice(i - 1, 0, result);
                                result = "";
                                i = i - 1;
                            }
                            console.log(mangChuSo);
                        }
                        mangPhepTinhUuTien = [];
                        const vitri = mangChuSo.indexOf("(");
                        console.log(mangChuSo);
                        mangChuSo.splice(mangChuSo.indexOf("("), 1);
                        mangChuSo.splice(mangChuSo.indexOf(")"), 1);
                    }
                }
            }

            // buoc tinh khong con dau ngoac
            if (
                mangChuSo.indexOf("x") !== -1 ||
                mangChuSo.indexOf("/") !== -1 ||
                mangChuSo.indexOf("^") !== -1 ||
                mangChuSo.indexOf("!")
            ) {
                mangPhepTinhUuTien = checkUuTien.checkNhanChia(mangChuSo);
            }
            for (let i = 0; i < mangPhepTinhUuTien.length; i++) {
                if (mangChuSo[mangPhepTinhUuTien[i]] === "x") {
                    const res = checkUuTien.NhanChia(
                        mangPhepTinhUuTien,
                        mangChuSo
                    );
                    mangChuSo = res.mangChuSo;
                    mangPhepTinhUuTien = res.mangPhepTinhUuTien;
                }
                if (mangChuSo[mangPhepTinhUuTien[i]] === "/") {
                    const res = checkUuTien.NhanChia(
                        mangPhepTinhUuTien,
                        mangChuSo
                    );
                    mangChuSo = res.mangChuSo;
                    mangPhepTinhUuTien = res.mangPhepTinhUuTien;
                }
                if (mangChuSo[mangPhepTinhUuTien[i]] === "^") {
                    const res = checkUuTien.MuGiaiThua(mangPhepTinhUuTien, mangChuSo);
                    mangChuSo = res.mangChuSo;
                    mangPhepTinhUuTien = res.mangPhepTinhUuTien;
                }
                if (mangChuSo[mangPhepTinhUuTien[i]] === "!") {
                    const res = checkUuTien.MuGiaiThua(mangPhepTinhUuTien, mangChuSo);
                    mangChuSo = res.mangChuSo;
                    mangPhepTinhUuTien = res.mangPhepTinhUuTien;
                }
            }
            for (let i = 0; i < mangChuSo.length - 1; i++) {
                if (mangChuSo[i] === "+" || mangChuSo[i] === "-") {
                    console.log(mangChuSo[i - 1], mangChuSo[i + 1]);
                    result = calculator.checkCongTru(
                        mangChuSo[i - 1],
                        `${mangChuSo[i]}${mangChuSo[i + 1]}`
                    );
                    console.log(result);
                    mangChuSo.splice(i - 1, 3);
                    mangChuSo.splice(i - 1, 0, result);
                    result = "";
                    i = -1;
                }
                console.log(mangChuSo);
            }

            if (mangChuSo[0].charAt(0) === "-") {
                for (let i = 1; i < mangChuSo[0].length; i++) {
                    if (mangChuSo[0].charAt(i) !== "0") {
                        s =
                            mangChuSo[0].charAt(0) +
                            mangChuSo[0].slice(i, mangChuSo[0].length);
                        console.log(s);
                        break;
                    }
                }
            }
            if (mangChuSo[0].charAt(0) !== "-") {
                for (let i = 0; i < mangChuSo[0].length; i++) {
                    if (mangChuSo[0].charAt(i) !== "0") {
                        s = mangChuSo[0].slice(i, mangChuSo[0].length);
                        console.log(s);
                        break;
                    }
                }
            }
            if (s === "") {
                s = "0";
            }

            return {
                ...state,
                ketqua: s,
                history: [...state.history, screen + "=" + s],
            };
        case PhepTinhConstants.CLEARVALUE:
            return {
                ...state,
                ketqua: "",
            };
        default:
            return { ...state };
    }
};

export default reducer;
