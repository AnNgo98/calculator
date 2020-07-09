import { PUSHVALUE, CLEARVALUE } from "../constants/PhepTinh";
export const Push_Value = (data) => {
    return {
        type: PUSHVALUE,
        data,
    };
};

export const Clear_Value = () =>{
    return {
        type: CLEARVALUE,
    }
}