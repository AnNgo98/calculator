import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import "./App.scss";
import { Push_Value, Clear_Value } from "./actions/PhepTinh";

function App() {
    const dispatch = useDispatch();
    const ketquaTinh = useSelector((state) => state.PhepTinh.ketqua);
    const history = useSelector((state) => state.PhepTinh.history);
    // STATE
    var mangXuLy = [];
    const [error, setError] = useState(false);
    const [mangChuSo, setMangChuSo] = useState([]);
    // const [mangPhepTinh, setMangPhepTinh] = useState([]);
    const [screen, setScreen] = useState("");
    // luu so
    const [arr, setArr] = useState("");
    // luu phep tinh
    const [pheptinh, setPhepTinh] = useState("");
    const [result, setResult] = useState("0");
    const [showModal, setShowModal] = useState(false);
    // USEEFFECT
    useEffect(() => {
        if (mangChuSo[mangChuSo.length - 1] === "=") {
            dispatch(Push_Value({ mangChuSo, screen }));
            // _inKetQua();
        }
    }, [mangChuSo]);

    // arr: là số được lưu tạm thời cho tới khi gặp + - * / lưu vào setMangChuSo
    // pheptinh: là mảng các dấu tạm thời
    // setPhepTinh : là action để thêm dấu vào mảng pheptinh
    // cái mangChuSo là cái mảng tách ra được các số, các dấu
    // FUNC

    const _updateArr = (value) => {
        var chuyen = "";

        if (value === "dau") {
            if (arr === "") {
                setArr(arr + "-");
                setScreen(screen + "-");
            }
            if (arr !== "") {
                if (arr.charAt(0) === "-") {
                    chuyen = arr;
                    chuyen = chuyen.slice(1, arr.length);
                    setArr(chuyen);
                    chuyen = screen;
                    chuyen = chuyen.slice(0, screen.length - 1);
                    setScreen(chuyen);
                }
            }
        }
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
            if (pheptinh !== "") {
                // setMangPhepTinh([...mangPhepTinh, pheptinh]);
                setMangChuSo([...mangChuSo, pheptinh]);
                setPhepTinh("");
            }
            setArr(arr + value);
        }
        if (
            value === "+" ||
            value === "-" ||
            value === "x" ||
            value === "/" ||
            value === "^"
        ) {
            if (arr !== "") {
                setMangChuSo([...mangChuSo, arr]);
                setArr("");
            }
            if (
                pheptinh !== "" &&
                screen !== "" &&
                screen.charAt(screen.length - 1) !== "("
            ) {
                chuyen = screen;
                chuyen = chuyen.slice(0, screen.length - 1);
                setScreen(chuyen);
                setScreen(chuyen + value);
                setPhepTinh(value);
            }
            if (
                pheptinh === "" &&
                screen !== "" &&
                screen.charAt(screen.length - 1) !== "("
            ) {
                setScreen(screen + value);
                setPhepTinh(pheptinh + value);
            }
        }
        if (value === "!") {
            if (arr !== "") {
                setMangChuSo([...mangChuSo, arr]);
                setArr("");
            }
            if (
                pheptinh !== "" &&
                screen !== "" &&
                screen.charAt(screen.length - 1) !== "("
            ) {
                chuyen = screen;
                chuyen = chuyen.slice(0, screen.length - 1);
                setScreen(chuyen);
                setScreen(chuyen + value);
                setPhepTinh(value);
            }
            if (
                pheptinh === "" &&
                screen !== "" &&
                screen.charAt(screen.length - 1) !== "("
            ) {
                setScreen(screen + value);
                setArr(value);
            }
        }
        if (value === "(" || value === ")") {
            setScreen(screen + value);
            if (pheptinh !== "") {
                setMangChuSo([...mangChuSo, pheptinh, value]);
                setPhepTinh("");
            }
            if (arr !== "") {
                setMangChuSo([...mangChuSo, arr, value]);
                setArr("");
            }
            if (pheptinh === "" && arr === "") {
                setMangChuSo([...mangChuSo, value]);
            }
        }
    };
    const _renderHistory = (data) => {
        if (data) {
            return data.map((item, index) => {
                return <div>{index+1}. {item}</div>;
            });
        }

    };
    const _clear = () => {
        dispatch(Clear_Value());
        setScreen("");
        setError(false);
        setMangChuSo([]);
        setArr("");
        setPhepTinh("");
        // setMangPhepTinh([]);
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
                    <div
                        onClick={() => _updateArr("^")}
                        className="keyboard-container__item-normal"
                    >
                        <p>^</p>
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
                    <div
                        onClick={() => _updateArr("!")}
                        className="keyboard-container__item-normal"
                    >
                        !
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
                        onClick={() => _updateArr("dau")}
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
                    <div
                        onClick={() => setShowModal(!showModal)}
                        className="keyboard-container__item-normal"
                    >
                        <HistoryOutlined />
                    </div>
                </div>
            </div>
            <Modal
                title="Lịch sử các phép tính bạn thực hiện"
                visible={showModal}
                // onOk={() => setShowModal(!showModal)}
                onCancel={() => setShowModal(!showModal)}
                footer={null}
            >
                {_renderHistory(history)}
            </Modal>
        </div>
    );
}

export default App;
