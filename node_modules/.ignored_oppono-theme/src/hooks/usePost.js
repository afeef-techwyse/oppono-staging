import { useEffect, useState } from 'react';
import axios from 'axios';


export default (endPoint, data, thenCallBack, defaultValue = null) => {
    if (!endPoint)
        return defaultValue;
    const [endPointData, setEndPointData] = useState(defaultValue);
    useEffect(() => {
        axios.post(endPoint, data)
            .then(response => {
                thenCallBack?.(response);
                setEndPointData(response.data);
            }).catch(error => {
                const { response } = error;

                if (response?.status === 301) {
                }
                else if (response?.status === 403) {
                }
            });
    }, []);
    return endPointData;
}

