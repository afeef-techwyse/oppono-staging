import { useEffect, useState } from 'react';

export default (endPoint, data, thenCallBack, catchCallBack, defaultValue = null) => {
    if (!endPoint)
        return defaultValue;
    const [endPointData, setEndPointData] = useState(defaultValue);
    // const user = useContext('user');

    //todo check if user is logged in then add auth headers

    useEffect(() => {
        opponoApi.post(endPoint, data)
            .then(response => {
                thenCallBack?.(response);
                setEndPointData(response);
            }).catch(error => {
                const { response } = error;

                catchCallBack?.(error);
                if (response?.status === 301) {
                }
                else if (response?.status === 403) {
                }
            });
    }, []);
    return endPointData;
}

