export const insert = (x) => {
    return `0${x}`;
};

export const insertAfter = (x) => {
    return `${x}0`;
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

// chuẩn hóa thêm số 0 vào sau
export const ChuanHoaAfter = (a, b, l1, l2) => {
    if (l1 > l2) {
        for (let i = l1 - l2; i > 0; i--) {
            b = insertAfter(b);
        }
        return b;
    } else {
        for (let i = l2 - l1; i > 0; i--) {
            a = insertAfter(a);
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
    let check = 0;
    if (a.includes('.') || b.includes('.')) {
        // giá trị trước dấu .
        var tempa = a.slice(0, a.indexOf('.'))
        var tempb = b.slice(0, b.indexOf('.'))
        // giá trị sau dấu .
        var tempa1 = a.slice(a.indexOf('.') + 1, a.length);
        var tempb1 = b.slice(b.indexOf('.') + 1, b.length);
        // kiểm tra số đằng trước dấu .
        if (tempa.length > tempb.length) {
            return 1;
        } else {
            if (tempa.length < tempb.length) {
                return -1;
            } else {
                let len = 0;
                while (len <= tempa.length - 1) {
                    if (StringToNumber(tempa.charAt(len)) > StringToNumber(tempb.charAt(len))) {
                        return 1;
                    } else if (
                        StringToNumber(tempa.charAt(len)) < StringToNumber(tempb.charAt(len))
                    ) {
                        return -1;
                    } else {
                        len++;
                    }
                }
                check = 1;
            }
        }
        if (check = 1) {
            // kiểm tra số đằng sau dấu .
            var la1 = tempa1.length;
            var lb1 = tempb1.length;
            var l1;
            if (la1 > lb1) {
                tempb1 = ChuanHoaAfter(tempa1, tempb1, la1, lb1);
                l1 = la1;
            } else {
                tempa1 = ChuanHoaAfter(tempa1, tempb1, la1, lb1);
                l1 = lb1;
            }
            let len = 0;
            while (len <= tempa1.length - 1) {
                if (StringToNumber(tempa1.charAt(len)) > StringToNumber(tempb1.charAt(len))) {
                    return 1;
                } else if (
                    StringToNumber(tempa1.charAt(len)) < StringToNumber(tempb1.charAt(len))
                ) {
                    return -1;
                } else {
                    len++;
                }
            }
        }
        return 0;
    } else {
        if (a.length > b.length) {
            return 1;
        } else if (a.length < b.length) {
            return -1;
        } else {
            let len = 0;
            let kq = 0;

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
    }
};
export const StringToNumber = (s) => {
    return parseInt(s);
};
const NumberToString = (num) => {
    return num.toString();
};
export const checkCongTru = (a, b) => {
    var KetQuaCheck;
    var dauA = 1;
    var dauB = 1;
    dauA = XetDauCuaSo(a);
    dauB = XetDauCuaSo(b);
    a = TachDauRaKhoiSo(a);
    b = TachDauRaKhoiSo(b);
    if (a.includes('.') || b.includes('.')) {
        if (!a.includes('.')) {
            a = `${a}${'.0'}`
        }
        if (!b.includes('.')) {
            b = `${b}${'.0'}`
        }
        if (dauA * dauB > 0) {
            KetQuaCheck = tongSoThuc(dauA, a, b);
        } else {
            const checkSoLon = SoSanh2SL(a, b);
            if (checkSoLon === 0) {
                KetQuaCheck = hieuSoThuc(dauB, b, a);
            }
            if (checkSoLon === 1) {
                KetQuaCheck = hieuSoThuc(dauA, a, b);
            }
            if (checkSoLon === -1) {
                KetQuaCheck = hieuSoThuc(dauB, b, a);
            }
            if (dauA === 0 && dauB === 0) {
                KetQuaCheck = tongSoThuc(dauA, a, b);
            }
        }
    } else {
        if (dauA * dauB > 0) {
            KetQuaCheck = tong(dauA, a, b);
        } else {
            const checkSoLon = SoSanh2SL(a, b);
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

export const tongSoThuc = (dau, a, b) => {
    console.log(a);
    console.log(b);
    // giá trị trước dấu .
    var tempa = a.slice(0, a.indexOf('.'))
    var tempb = b.slice(0, b.indexOf('.'))
    // giá trị sau dấu .
    var tempa1 = a.slice(a.indexOf('.') + 1, a.length);
    var tempb1 = b.slice(b.indexOf('.') + 1, b.length);
    var s = "";
    // ktra giá trị sau dấu .
    var la1 = tempa1.length;
    var lb1 = tempb1.length;
    var l1;
    if (la1 > lb1) {
        tempb1 = ChuanHoa(tempa1, tempb1, la1, lb1);
        l1 = la1;
    } else {
        tempa1 = ChuanHoa(tempa1, tempb1, la1, lb1);
        l1 = lb1;
    }
    var temp1 = 0;
    for (let i = l1 - 1; i >= 0; i--) {
        temp1 += StringToNumber(tempa1.charAt(i)) + StringToNumber(tempb1.charAt(i));
        s = InsertToResult(s, Math.floor(temp1 % 10));
        temp1 = Math.floor(temp1 / 10);
    }
    if (StringToNumber(s) === 0) {
        s = "";
    } else {
        s = InsertToResult(s, ".");
    }
    // kiểm tra số 0 đằng sau dấu . của gtri sau dấu .
    for (let i = s.length - 1; i >= 0; i--) {
        if (StringToNumber(s.charAt(i)) !== 0) {
            break;
        } else {
            s = s.slice(0, i);
        }
    }
    // ktra giá trị trước dấu .
    var la = tempa.length;
    var lb = tempb.length;
    var l;
    if (temp1 > 0) {
        tempa = NumberToString(StringToNumber(tempa) + 1);
    }
    if (la > lb) {
        tempb = ChuanHoa(tempa, tempb, la, lb);
        l = la;
    } else {
        tempa = ChuanHoa(tempa, tempb, la, lb);
        l = lb;
    }
    var temp = 0;
    for (let i = l - 1; i >= 0; i--) {
        temp += StringToNumber(tempa.charAt(i)) + StringToNumber(tempb.charAt(i));
        s = InsertToResult(s, Math.floor(temp % 10));
        temp = Math.floor(temp / 10);
    }
    if (temp > 0) {
        s = InsertToResult(s, temp);
    }
    if (dau === 0) {
        s = InsertToResult(s, "-");
    }
    return s;
}

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
        temp += StringToNumber(a.charAt(i)) + StringToNumber(b.charAt(i));
        s = InsertToResult(s, Math.floor(temp % 10));
        temp = Math.floor(temp / 10);
    }
    if (temp > 0) {
        s = InsertToResult(s, temp);
    }
    if (dau === 0) {
        s = InsertToResult(s, "-");
    }
    return s;
};

export const mu = (a, b) => {
    var dauA = 1;
    dauA = XetDauCuaSo(a);
    var s = 1;
    for (let i = 0; i < StringToNumber(b); i++) {
        s = s * StringToNumber(a);
    }
    s = NumberToString(s);
    return s;
}

export const giaiThua = (a) => {
    var dauA = 1;
    dauA = XetDauCuaSo(a);
    var s = 1;
    if (dauA === 1) {
        for (let i = 1; i <= StringToNumber(a); i++) {
            s *= i;
        }
        s = NumberToString(s);
    }
    if (dauA === 0) {
        const tempa = StringToNumber(a) * -1;
        for (let i = 1; i <= tempa; i++) {
            s *= i;
        }
        s = NumberToString(s * -1);
    }

    return s;
}

export const hieuSoThuc = (dau, a, b) => {
    console.log(a);
    console.log(b);
    // giá trị trước dấu .
    var tempa = a.slice(0, a.indexOf('.'))
    var tempb = b.slice(0, b.indexOf('.'))
    // giá trị sau dấu .
    var tempa1 = a.slice(a.indexOf('.') + 1, a.length);
    var tempb1 = b.slice(b.indexOf('.') + 1, b.length);
    // ktra giá trị sau dấu .
    var la1 = tempa1.length;
    var lb1 = tempb1.length;
    var l1;
    if (la1 > lb1) {
        tempb1 = ChuanHoaAfter(tempa1, tempb1, la1, lb1);
        l1 = la1;
    } else {
        tempa1 = ChuanHoaAfter(tempa1, tempb1, la1, lb1);
        l1 = lb1;
    }
    var s = "";
    var temp1 = 0;
    var nho = 0;
    var nhosotru = 0;
    for (let i = l1 - 1; i >= 0; i--) {
        if (StringToNumber(tempa1.charAt(i)) < StringToNumber(tempb1.charAt(i)) + nho) {
            if (StringToNumber(tempb1.charAt(i)) + nho >= 10) {
                temp1 = StringToNumber(tempa1.charAt(i));
                nhosotru = 1;
                nho = 1;
            } else {
                temp1 =
                    StringToNumber(tempa1.charAt(i)) +
                    10 -
                    (StringToNumber(tempb1.charAt(i)) + nho);
                nho = 1;
            }
        } else {
            temp1 =
                StringToNumber(tempa1.charAt(i)) -
                (StringToNumber(tempb1.charAt(i)) + nho);
            nho = 0;
        }
        s = InsertToResult(s, temp1);
        temp1 = 0;
    }
 
    if (StringToNumber(s) === 0) {
        s = "";
    } else {
        s = InsertToResult(s, ".");
    }
    // kiểm tra số 0 đằng sau dấu . của gtri sau dấu .
    for (let i = s.length - 1; i >= 0; i--) {
        if (StringToNumber(s.charAt(i)) !== 0) {
            break;
        } else {
            s = s.slice(0, i);
        }
    }
    console.log(s);
    // giá trị trước dấu .
    var la = tempa.length;
    var lb = tempb.length;
    var l;
    if (la > lb) {
        tempb = ChuanHoa(tempa, tempb, la, lb);
        l = la;
    } else {
        tempa = ChuanHoa(tempa, tempb, la, lb);
        l = lb;
    }
    var temp = 0;
    var nho1 = 0;
    var nhosotru1 = 0;
    for (let i = l - 1; i >= 0; i--) {
        if (StringToNumber(tempa.charAt(i)) < StringToNumber(tempb.charAt(i)) + nho1) {
            if (StringToNumber(tempb.charAt(i)) + nho1 >= 10) {
                temp = StringToNumber(tempa.charAt(i));
                nhosotru1 = 1;
                nho1 = 1;
            } else {
                temp =
                    StringToNumber(tempa.charAt(i)) +
                    10 -
                    (StringToNumber(tempb.charAt(i)) + nho1);
                nho1 = 1;
            }
        } else {
            temp =
                StringToNumber(tempa.charAt(i)) -
                (StringToNumber(tempb.charAt(i)) + nho1);
            nho1 = 0;
        }
        s = InsertToResult(s, temp);
        temp = 0;
    }
    if (dau === 0) {
        s = InsertToResult(s, "-");
    }
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
    if (s.length > 1) {
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) !== "0") {
                s = s.slice(i, s.length);
                break;
            }
        }
    }
    if (dau === 0) {
        s = InsertToResult(s, "-");
    }
    return s;
};

export const checkChia = (a, b) => {
    var kq_chia = "";
    var dauA = 1;
    var dauB = 1;
    dauA = XetDauCuaSo(a);
    dauB = XetDauCuaSo(b);
    a = TachDauRaKhoiSo(a);
    b = TachDauRaKhoiSo(b);
    if (b === "0") {
        return null;
    }
    const checkSoLon = SoSanh2SL(a, b);
    if (dauA === 0 && dauB === 0) {
        kq_chia = chia(1, a, b, checkSoLon);
    } else {
        if ((dauA === 1 && dauB === 0) || (dauA === 0 && dauB === 1)) {
            kq_chia = chia(0, a, b, checkSoLon);
        } else kq_chia = chia(1, a, b, checkSoLon);
    }
    return kq_chia;
};

export const chia = (dau, a, b, checkSoLon) => {
    var s_chia = "";
    if (checkSoLon === -1) {
        return "0";
    }
    if (checkSoLon === 0) {
        return "1";
    }
    if (checkSoLon === 1) {
        var idx_chia = 0;
        var temp_chia = a[idx_chia];
        while (StringToNumber(temp_chia) < StringToNumber(b)) {
            idx_chia += 1;
            temp_chia =
                StringToNumber(temp_chia * 10) + StringToNumber(a[idx_chia]);
        }
        console.log(temp_chia);
        while (a.length > idx_chia) {
            s_chia += NumberToString(
                Math.floor(StringToNumber(temp_chia) / StringToNumber(b))
            );

            idx_chia += 1;
            temp_chia =
                StringToNumber(StringToNumber(temp_chia) % StringToNumber(b)) *
                10 +
                StringToNumber(a[idx_chia]);
        }
        if (s_chia.length === 0) {
            return "0";
        }
    }
    if (dau === 0) {
        return InsertToResult(s_chia, "-");
    }
    return s_chia;
};