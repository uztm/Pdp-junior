import axios from "axios";


// export const BASE_URL = 'http://185.74.5.104:8080'
export const BASE_URL = 'https://api.pdp.uz'

const api = axios.create({
    baseURL: BASE_URL, // make sure this is correctly defined
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthHeader = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const getUserInfo = async (token: any, id: any) => {
    setAuthHeader(token);
    console.log({ id }, 'from info');
    console.log({ token }, 'from info');


    try {
        const response = await api.get(`/api/education/v1/junior-app/info-student/${id}/`);
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export const getPaymentHistory = async (token: any, id: any) => {
    // console.log({token});
    console.log({ id });

    setAuthHeader(token);
    // console.log(api.defaults.headers.common); // Проверяем заголовки
    try {
        const response = await api.get(`/api/education/v1/junior-app/payment-history/${id}/`);
        return response.data;
    } catch (error) {
        console.log({ error });
    }
};


export const getShop = async (token: any) => {
    setAuthHeader(token);
    try {
        const response = await api.get(`/api/education/v1/coin-prize/get-all`);
        return response.data;
    }
    catch (error) {
        console.log({ error });
    }
}





export const getPatment = async (token: any, id: any) => {
    setAuthHeader(token);
    try {
        const response = await api.get(`https://adminapi.pdp.uz/api/finance/v1/payment/${id}`);
        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export const getMyGifts = async (token: any, id: any) => {
    setAuthHeader(token);
    try {
        const response = await api.get(`/api/education/v1/student-coin-exchange/get-all-by-student-id/${id}/`);
        return response.data;
    } catch (e) {
        console.log({ e });

    }
}

export const Login = async (phoneNumber: any) => {
    const phone = '+998' + phoneNumber;
    console.log({ phone });

    try {
        const response = await api.post(`api/auth/v1/junior-app/login`, { phoneNumber: phone });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export const EnterPassword = async (phoneNumber: any, password: any) => {
    const phone = '+998' + phoneNumber;
    console.log({ phone, password });

    try {
        const response = await api.post(`api/auth/v1/junior-app/enter-password`, { phoneNumber: phone, password: password });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log({ error });
    }
}

export const Otp = async (phoneNumber: any, smsCodeId: any, sms: any) => {
    const phone = '+998' + phoneNumber;
    console.log({ phoneNumber });
    console.log({ smsCodeId });
    console.log({ sms });



    try {
        const response = await api.post(`api/auth/v1/junior-app/chek-sms-code`, { phoneNumber: phone, smsCodeId: smsCodeId, smsCode: sms });
        console.log(response.data);

        return response.data;
    } catch (e) {
        console.log({ e });

    }
}
// 991885000
export const getChilds = async (token: any, phoneNumber: any) => {
    const phone = '+998' + phoneNumber;
    console.log({ phone });

    setAuthHeader(token)
    try {
        const response = await api.get(`/api/education/v1/student/get-students-info/${phone}`)
        // console.log(response.data);
        return response.data


    } catch (e) {
        console.log({ e });

    }
}

export const exchange = async (token: any, userID: any, giftID: any) => {
    setAuthHeader(token)
    try {
        const response = await api.post(`/api/education/v1/student-coin-exchange/student-exchange`, { studentId: userID, coinPrizeId: giftID })
        console.log(response.data);
        return response.data;

    } catch (e) {
        console.log(e);

    }
}