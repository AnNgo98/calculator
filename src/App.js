import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.scss";
import * as calculator from "./helpers/phepcong";
import { Push_Value, Clear_Value } from "./actions/PhepTinh";

function App() {
    const dispatch = useDispatch();
    const ketquaTinh = useSelector((state) => state.PhepTinh.ketqua);
    // STATE
    var mangXuLy = [];
    const [error, setError] = useState(false);
    const [mangChuSo, setMangChuSo] = useState([]);
    const [mangPhepTinh, setMangPhepTinh] = useState([]);
    const [screen, setScreen] = useState("");
    // luu so
    const [arr, setArr] = useState("");
    // luu phep tinh
    const [pheptinh, setPhepTinh] = useState("");
    const [result, setResult] = useState("0");

    // USEEFFECT
    useEffect(() => {
        if (mangChuSo[mangChuSo.length - 1] === "=") {
            dispatch(Push_Value({ mangChuSo }));
            _inKetQua();
        }
    }, [mangChuSo]);

    // FUNC
    const _updateArr = (value) => {
        if (
            value === 0 ||
            value === 1 ||
            value === 2 ||
            value === 3 ||
            value === 4 ||
            value === 5 ||
            value === 6 ||
            value === 7 ||
            value === 8 ||
            value === 9
        ) {
            setScreen(screen + value);
            if (pheptinh.length > 2) {
                setError(true);
            }
            if (pheptinh !== "") {
                setMangPhepTinh([...mangPhepTinh, pheptinh]);
                setMangChuSo([...mangChuSo, pheptinh]);
                setPhepTinh("");
            }
            setArr(arr + value);
        }
        if (value === "+" || value === "-" || value === "x" || value === "/") {
            setScreen(screen + value);
            if (arr !== "") {
                setMangChuSo([...mangChuSo, arr]);
                setArr("");
            }
            setPhepTinh(pheptinh + value);
        }
        if (value === "(" || value === ")") {
            console.log(arr)
            setScreen(screen + value);
            if (pheptinh !== "") {
                console.log(value);
                setMangChuSo([...mangChuSo, pheptinh, value]);
                setPhepTinh("");
            }
            if (arr !== "") {
                setMangChuSo([...mangChuSo, arr, value]);
                setArr("");
            }
            if (pheptinh === "" && arr === "") {
                console.log("du ma")
                setMangChuSo([...mangChuSo, value]);
            }
        }
    };
    const _showKetQua = () => {
        console.log(mangPhepTinh);
        console.log(mangChuSo);
    };
    const _clear = () => {
        dispatch(Clear_Value());
        setScreen("");
        setError(false);
        setMangChuSo([]);
        setArr("");
        setPhepTinh("");
        setMangPhepTinh([]);
        setResult(0);
    };
    const _tinhKetQua = () => {
        if (arr !== "") {
            setMangChuSo((preMangChuSo) => [...preMangChuSo, arr, "="]);
        }
        if (arr === "") {
            setMangChuSo((preMangChuSo) => [...preMangChuSo, "="]);
        }
    };
    const _inKetQua = () => {
        if (mangChuSo.length - mangPhepTinh.length === 2) {
            let demPhepTinh = 0;
            while (demPhepTinh < mangPhepTinh.length) {
                if (
                    mangPhepTinh[demPhepTinh] === "-" ||
                    mangPhepTinh[demPhepTinh] === "+" ||
                    mangPhepTinh[demPhepTinh] === "--" ||
                    mangPhepTinh[demPhepTinh] === "+-" ||
                    mangPhepTinh[demPhepTinh] === "++"
                ) {
                    var kq = calculator.check(
                        mangChuSo[demPhepTinh],
                        `${mangPhepTinh[demPhepTinh]}${
                            mangChuSo[demPhepTinh + 1]
                        }`
                    );
                    setResult(kq);
                }
                if (
                    mangPhepTinh[demPhepTinh] === "x" ||
                    mangPhepTinh[demPhepTinh] === "/"
                ) {
                }
                demPhepTinh++;
            }
        }
    };

    // RENDER
    return (
        <div className="App">
            <div className="screen-container">
                <div>{screen}</div>
                <div>{ketquaTinh}</div>
                <div>{error ? "Phep toan khong hop le" : ""}</div>
            </div>
            <div className="keyboard-container">
                <div className="keyboard-container__line-container">
                    <div
                        onClick={() => _clear()}
                        className="keyboard-container__item-normal"
                    >
                        C
                    </div>
                    <div
                        onClick={() => _updateArr("(")}
                        className="keyboard-container__item-normal"
                    >
                        (
                    </div>
                    <div
                        onClick={() => _updateArr(")")}
                        className="keyboard-container__item-normal"
                    >
                        )
                    </div>
                    <div
                        onClick={() => _updateArr("/")}
                        className="keyboard-container__item-normal"
                    >
                        /
                    </div>
                </div>
                <div className="keyboard-container__line-container">
                    <div
                        onClick={() => _updateArr(7)}
                        className="keyboard-container__item-normal"
                    >
                        7
                    </div>
                    <div
                        onClick={() => _updateArr(8)}
                        className="keyboard-container__item-normal"
                    >
                        8
                    </div>
                    <div
                        onClick={() => _updateArr(9)}
                        className="keyboard-container__item-normal"
                    >
                        9
                    </div>
                    <div
                        onClick={() => _updateArr("x")}
                        className="keyboard-container__item-normal"
                    >
                        x
                    </div>
                </div>
                <div className="keyboard-container__line-container">
                    <div
                        onClick={() => _updateArr(4)}
                        className="keyboard-container__item-normal"
                    >
                        4
                    </div>
                    <div
                        onClick={() => _updateArr(5)}
                        className="keyboard-container__item-normal"
                    >
                        5
                    </div>
                    <div
                        onClick={() => _updateArr(6)}
                        className="keyboard-container__item-normal"
                    >
                        6
                    </div>
                    <div
                        onClick={() => _updateArr("-")}
                        className="keyboard-container__item-normal"
                    >
                        -
                    </div>
                </div>
                <div className="keyboard-container__line-container">
                    <div
                        onClick={() => _updateArr(1)}
                        className="keyboard-container__item-normal"
                    >
                        1
                    </div>
                    <div
                        onClick={() => _updateArr(2)}
                        className="keyboard-container__item-normal"
                    >
                        2
                    </div>
                    <div
                        onClick={() => _updateArr(3)}
                        className="keyboard-container__item-normal"
                    >
                        3
                    </div>
                    <div
                        onClick={() => _updateArr("+")}
                        className="keyboard-container__item-normal"
                    >
                        +
                    </div>
                </div>
                <div className="keyboard-container__line-container">
                    <div
                        onClick={() => _updateArr(0)}
                        className="keyboard-container__item-normal"
                    >
                        0
                    </div>
                    <div
                        onClick={() => _updateArr(true)}
                        className="keyboard-container__item-normal"
                    >
                        +/-
                    </div>
                    <div className="keyboard-container__item-normal">.</div>
                    <div
                        onClick={() => _tinhKetQua()}
                        className="keyboard-container__item-normal"
                    >
                        =
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
