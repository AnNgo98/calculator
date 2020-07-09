export const insert = (x) => {
    return `0${x}`;
};

export const InsertToResult = (result, x) => {
    return `${x.toString()}${result}`;
};

export const ChuanHoa = (a, b, l1, l2) => {
    if (l1 > l2) {
        for (let i = 0; i < l1 - l2; i++) {
            b = insert(b);
        }
        return b;
    } else {
        for (let i = 0; i < l2 - l1; i++) {
            a = insert(a);
        }
        return a;
    }
};

export const XetDauCuaSo = (a) => {
    let kq = 1;
    for (let i = 0; i < a.length; i++) {
        if (a.charAt(i) === "+") {
            if (kq === 0) {
                kq = 0;
            } else kq = 1;
        } else {
            if (a.charAt(i) === "-") {
                if (kq === 0) {
                    kq = 1;
                } else {
                    kq = 0;
                }
            }
        }
    }
    return kq;
};

export const TachDauRaKhoiSo = (a) => {
    for (let i = 0; i < a.length; i++) {
        if (a.charAt(i) === "+" || a.charAt(i) === "-") {
            a = a.substr(i + 1, a.length - 1);
            i = i - 1;
        }
    }
    return a;
};

export const SoSanh2SL = (a, b) => {
    var KQSoSanh2SL = 0;
    if (a.length > b.length) {
        return 1;
    } else if (a.length < b.length) {
        return -1;
    } else {
        let len = 0
        let kq = 0;
        // while (len >= 0) {
        //     if (StringToNumber(a.charAt(len)) > StringToNumber(b.charAt(len))) {
        //         len--;
        //         KQSoSanh2SL = 1;
        //     } else if (
        //         StringToNumber(a.charAt(len)) < StringToNumber(b.charAt(len))
        //     ) {
        //         len--;
        //         KQSoSanh2SL = -1;
        //     } else if (
        //         StringToNumber(a.charAt(len)) === StringToNumber(b.charAt(len))
        //     ) {
        //         len--;
        //         KQSoSanh2SL = 0;
        //     }
        // }

        while (len <= a.length - 1) {
            if (StringToNumber(a.charAt(len)) > StringToNumber(b.charAt(len))) {
                return 1;
            } else if (
                StringToNumber(a.charAt(len)) < StringToNumber(b.charAt(len))
            ) {
                return -1;
            } else {
                len++;
            }
        }
    }
    return 0;
};
export const StringToNumber = (s) => {
    return parseInt(s);
};
const NumberToString = (num) => {
    return num.toString();
};
export const check = (a, b) => {
    console.log(a," va ", b)
    var KetQuaCheck;
    var dauA = 1;
    var dauB = 1;
    dauA = XetDauCuaSo(a);
    dauB = XetDauCuaSo(b);
    a = TachDauRaKhoiSo(a);
    b = TachDauRaKhoiSo(b);
    console.log(dauA, dauB)
    console.log(a, b)
    if (dauA * dauB > 0) {
        KetQuaCheck = tong(dauA, a, b);
    } else {
        const checkSoLon = SoSanh2SL(a, b);
        console.log(checkSoLon)
        if (checkSoLon === 0) {
            KetQuaCheck = hieu(dauB, b, a);
        }
        if (checkSoLon === 1) {
            KetQuaCheck = hieu(dauA, a, b);
        }
        if (checkSoLon === -1) {
            KetQuaCheck = hieu(dauB, b, a);
        }
        if (dauA === 0 && dauB === 0) {
            KetQuaCheck = tong(dauA, a, b);
        }
    }
    return KetQuaCheck;
};
export const checkNhan = (a, b) => {
    var kq = "";
    var dauA = 1;
    var dauB = 1;
    dauA = XetDauCuaSo(a);
    dauB = XetDauCuaSo(b);
    a = TachDauRaKhoiSo(a);
    b = TachDauRaKhoiSo(b);
    const checkSoLon = SoSanh2SL(a, b);
    if (checkSoLon === 1) {
        if (dauA === 0 && dauB === 0) {
            kq = nhan(1, a, b);
        } else {
            if ((dauA === 1 && dauB === 0) || (dauA === 0 && dauB === 1)) {
                kq = nhan(0, a, b);
            } else kq = nhan(1, a, b);
        }
    }
    if (checkSoLon === -1) {
        if (dauA === 0 && dauB === 0) {
            kq = nhan(1, b, a);
        } else {
            if ((dauA === 1 && dauB === 0) || (dauA === 0 && dauB === 1)) {
                kq = nhan(0, b, a);
            } else kq = nhan(1, b, a);
        }
    }
    if (checkSoLon === 0) {
        if (dauA === 0 && dauB === 0) {
            kq = nhan(1, a, b);
        } else {
            if ((dauA === 1 && dauB === 0) || (dauA === 0 && dauB === 1)) {
                kq = nhan(0, a, b);
            } else kq = nhan(1, a, b);
        }
    }
    return kq;
};

export const nhan = (dau, a, b) => {
    var l1 = a.length;
    var l2 = b.length;
    var l;
    var s = "";
    var temp_nhan = 0;
    var Arr = [];
    for (let i = b.length - 1; i >= 0; i--) {
        Arr[i] = "";
        if (b.length - 1 - i !== 0) {
            for (let x = 0; x < b.length - 1 - i; x++) {
                Arr[i] = InsertToResult(Arr[i], 0);
            }
        }
        for (let j = a.length - 1; j >= 0; j--) {
            temp_nhan =
                StringToNumber(b.charAt(i)) * StringToNumber(a.charAt(j)) +
                temp_nhan;
            s = InsertToResult(s, Math.floor(temp_nhan % 10));
            temp_nhan = Math.floor(temp_nhan / 10);
        }
        if (temp_nhan > 0) {
            s = InsertToResult(s, temp_nhan);
        }
        Arr[i] = InsertToResult(Arr[i], s);
        s = "";
        temp_nhan = 0;
    }
    var TongMang = "0";
    if (Arr.length === 1) {
        if (dau === 0) {
            Arr[0] = InsertToResult(Arr[0], "-");
        }
        TongMang = Arr[0];
    } else {
        for (let i = 0; i < Arr.length; i++) {
            TongMang = tong(1, TongMang, Arr[i]);
        }
        if (dau === 0) {
            TongMang = InsertToResult(TongMang, "-");
        }
    }
    return TongMang;
};

export const tong = (dau, a, b) => {
    var l1 = a.length;
    var l2 = b.length;
    var l;
    if (l1 > l2) {
        b = ChuanHoa(a, b, l1, l2);
        var l = l1;
    } else {
        a = ChuanHoa(a, b, l1, l2);
        var l = l2;
    }
    var s = "";
    var temp = 0;
    for (let i = l - 1; i >= 0; i--) {
        temp = StringToNumber(a.charAt(i)) + StringToNumber(b.charAt(i)) + temp;
        s = InsertToResult(s, Math.floor(temp % 10));
        temp = Math.floor(temp / 10);
    }
    if (temp > 0) {
        s = InsertToResult(s, temp);
    }
    // for (let i = 0; i< s.length;i++){
    //     if(s.charAt(i)!==0){
    //         s = s.slice(i, s.length-1);
    //         break;
    //     }

    // }
    if (dau === 0) {
        s = InsertToResult(s, "-");
    }
    // for (let i = 0; i< s.length;i++){
    //     if(s.charAt(i)!==0){
    //         s = s.slice(i, s.length-1);
    //         break;
    //     }

    // }
    console.log(s);
    return s;
};

export const hieu = (dau, a, b) => {
    var l1 = a.length;
    var l2 = b.length;
    var l;
    if (l1 > l2) {
        b = ChuanHoa(a, b, l1, l2);
        var l = l1;
    } else {
        a = ChuanHoa(a, b, l1, l2);
        var l = l2;
    }
    var s = "";
    var temp = 0;
    var nho = 0;
    var nhosotru = 0;
    for (let i = l - 1; i >= 0; i--) {
        if (StringToNumber(a.charAt(i)) < StringToNumber(b.charAt(i)) + nho) {
            if (StringToNumber(b.charAt(i)) + nho >= 10) {
                temp = StringToNumber(a.charAt(i));
                nhosotru = 1;
                nho = 1;
            } else {
                temp =
                    StringToNumber(a.charAt(i)) +
                    10 -
                    (StringToNumber(b.charAt(i)) + nho);
                nho = 1;
            }
        } else {
            temp =
                StringToNumber(a.charAt(i)) -
                (StringToNumber(b.charAt(i)) + nho);
            nho = 0;
        }
        s = InsertToResult(s, temp);
        temp = 0;
    }
    // if (temp > 0) {
    //     s = InsertToResult(s, temp);
    // }
    // for (let i = 0; i< s.length;i++){
    //     if(s.charAt(i)!==0){
    //         s = s.slice(i, s.length-1);
    //         break;
    //     }

    // }
    for (let i = 0; i < s.length; i++){
        if(s.charAt(i)!=="0"){
            console.log(i)
            s = s.slice(i, s.length)
            break;
        }
    }
    if (dau === 0) {
        s = InsertToResult(s, "-");
    }
    console.log(s);
    return s;
};

// check("512", "--+-398");

// checkNhan("-123456789", "-123456789");
